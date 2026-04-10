// Admin Enquiries Management Page
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Trash2, Eye, Mail, Phone, Calendar } from 'lucide-react';
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../services/firebase';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { PageLoader } from '../../components/common/Loader';

const EnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  useEffect(() => {
    filterEnquiries();
  }, [searchTerm, statusFilter, enquiries]);

  const fetchEnquiries = async () => {
    try {
      const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEnquiries(data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  const filterEnquiries = () => {
    let filtered = [...enquiries];

    if (searchTerm) {
      filtered = filtered.filter(
        (e) =>
          e.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.phone?.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((e) => e.status === statusFilter);
    }

    setFilteredEnquiries(filtered);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'enquiries', id), {
        status: newStatus,
        updatedAt: new Date(),
      });
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e)));
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const deleteEnquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      await deleteDoc(doc(db, 'enquiries', id));
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      toast.success('Enquiry deleted successfully');
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      toast.error('Failed to delete enquiry');
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Loan Type', 'Amount', 'Status', 'Date'];
    const rows = filteredEnquiries.map((e) => [
      e.name,
      e.email,
      e.phone,
      e.loanType || 'N/A',
      e.loanAmount || 'N/A',
      e.status,
      e.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A',
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enquiries-${Date.now()}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  const getStatusBadge = (status) => {
    const variants = {
      new: 'primary',
      contacted: 'warning',
      resolved: 'success',
    };
    return variants[status] || 'default';
  };

  const viewDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowDetailsModal(true);
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-light-text dark:text-dark-text">
            Enquiries Management
          </h1>
          <p className="text-light-textSecondary dark:text-dark-textSecondary mt-1">
            Manage and respond to customer enquiries
          </p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-textSecondary dark:text-dark-textSecondary" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredEnquiries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                No enquiries found
              </p>
            </div>
          ) : (
            filteredEnquiries.map((enquiry) => (
              <motion.div
                key={enquiry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-light-text dark:text-dark-text">
                        {enquiry.name}
                      </h3>
                      <Badge variant={getStatusBadge(enquiry.status)}>{enquiry.status}</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {enquiry.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {enquiry.phone}
                      </div>
                      {enquiry.loanType && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Loan Type:</span>
                          {enquiry.loanType}
                          {enquiry.loanAmount && ` - ₹${enquiry.loanAmount.toLocaleString()}`}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {enquiry.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={enquiry.status}
                      onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                      className="px-3 py-1 text-sm bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <Button size="sm" variant="outline" onClick={() => viewDetails(enquiry)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deleteEnquiry(enquiry.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Card>

      {/* Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Enquiry Details"
      >
        {selectedEnquiry && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">
                Name
              </label>
              <p className="text-light-text dark:text-dark-text">{selectedEnquiry.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">
                Email
              </label>
              <p className="text-light-text dark:text-dark-text">{selectedEnquiry.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">
                Phone
              </label>
              <p className="text-light-text dark:text-dark-text">{selectedEnquiry.phone}</p>
            </div>
            {selectedEnquiry.loanType && (
              <div>
                <label className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">
                  Loan Type
                </label>
                <p className="text-light-text dark:text-dark-text">{selectedEnquiry.loanType}</p>
              </div>
            )}
            {selectedEnquiry.loanAmount && (
              <div>
                <label className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">
                  Loan Amount
                </label>
                <p className="text-light-text dark:text-dark-text">
                  ₹{selectedEnquiry.loanAmount.toLocaleString()}
                </p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">
                Message
              </label>
              <p className="text-light-text dark:text-dark-text whitespace-pre-wrap">
                {selectedEnquiry.message}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">
                Status
              </label>
              <div className="mt-1">
                <Badge variant={getStatusBadge(selectedEnquiry.status)}>
                  {selectedEnquiry.status}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">
                Submitted On
              </label>
              <p className="text-light-text dark:text-dark-text">
                {selectedEnquiry.createdAt?.toDate?.()?.toLocaleString() || 'N/A'}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EnquiriesPage;
