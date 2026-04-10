// Admin Enquiries Management Page - With clickable rows and detail modal
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Download,
  Trash2,
  X,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  FileText,
  Clock,
} from 'lucide-react';
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { showSuccess, showError, toastActions } from '../../utils/toast.jsx';
import { confirmDelete } from '../../utils/confirm';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
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
      showError('Failed to load enquiries');
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
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
      toastActions.enquiryUpdated();
    } catch (error) {
      console.error('Error updating status:', error);
      showError('Failed to update status');
    }
  };

  const deleteEnquiry = async (id) => {
    const confirmed = await confirmDelete('this enquiry');
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, 'enquiries', id));
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      if (selectedEnquiry?.id === id) {
        setShowDetailsModal(false);
        setSelectedEnquiry(null);
      }
      toastActions.enquiryDeleted();
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      showError('Failed to delete enquiry');
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
    showSuccess('Exported to CSV successfully');
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-light-text dark:text-dark-text">
            Enquiries Management
          </h1>
          <p className="text-light-textSecondary dark:text-dark-textSecondary mt-1">
            Manage and respond to customer enquiries
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
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
              className="w-full pl-10 pr-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-light-text dark:text-dark-text">
                  Customer Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-light-text dark:text-dark-text hidden md:table-cell">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-light-text dark:text-dark-text hidden lg:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-12">
                    <p className="text-light-textSecondary dark:text-dark-textSecondary">
                      No enquiries found
                    </p>
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <motion.tr
                    key={enquiry.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => viewDetails(enquiry)}
                    className="border-b border-light-border dark:border-dark-border hover:bg-light-surface dark:hover:bg-dark-surface cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="font-medium text-light-text dark:text-dark-text">
                        {enquiry.name}
                      </div>
                      <div className="text-sm text-light-textSecondary dark:text-dark-textSecondary md:hidden">
                        {enquiry.status}
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <Badge variant={getStatusBadge(enquiry.status)}>{enquiry.status}</Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-light-textSecondary dark:text-dark-textSecondary hidden lg:table-cell">
                      {enquiry.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedEnquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-light-surface dark:bg-dark-surface rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                  Enquiry Details
                </h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 rounded-lg hover:bg-light-background dark:hover:bg-dark-background transition-colors"
                >
                  <X className="w-6 h-6 text-light-text dark:text-dark-text" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Customer Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-1">
                        <Mail className="w-4 h-4" />
                        Name
                      </label>
                      <p className="text-light-text dark:text-dark-text font-medium">
                        {selectedEnquiry.name}
                      </p>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-1">
                        <Mail className="w-4 h-4" />
                        Email
                      </label>
                      <p className="text-light-text dark:text-dark-text">{selectedEnquiry.email}</p>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-1">
                        <Phone className="w-4 h-4" />
                        Phone
                      </label>
                      <p className="text-light-text dark:text-dark-text">{selectedEnquiry.phone}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedEnquiry.loanType && (
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-1">
                          <FileText className="w-4 h-4" />
                          Loan Type
                        </label>
                        <p className="text-light-text dark:text-dark-text">
                          {selectedEnquiry.loanType}
                        </p>
                      </div>
                    )}
                    {selectedEnquiry.loanAmount && (
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-1">
                          <DollarSign className="w-4 h-4" />
                          Loan Amount
                        </label>
                        <p className="text-light-text dark:text-dark-text font-semibold">
                          ₹{selectedEnquiry.loanAmount.toLocaleString()}
                        </p>
                      </div>
                    )}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-1">
                        <Calendar className="w-4 h-4" />
                        Submitted On
                      </label>
                      <p className="text-light-text dark:text-dark-text">
                        {selectedEnquiry.createdAt?.toDate?.()?.toLocaleString() || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message */}
                {selectedEnquiry.message && (
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2">
                      <FileText className="w-4 h-4" />
                      Message
                    </label>
                    <div className="p-4 bg-light-background dark:bg-dark-background rounded-lg">
                      <p className="text-light-text dark:text-dark-text whitespace-pre-wrap">
                        {selectedEnquiry.message}
                      </p>
                    </div>
                  </div>
                )}

                {/* Status Management */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2">
                    <Clock className="w-4 h-4" />
                    Status
                  </label>
                  <div className="flex items-center gap-3">
                    <select
                      value={selectedEnquiry.status}
                      onChange={(e) => updateStatus(selectedEnquiry.id, e.target.value)}
                      className="flex-1 px-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <Badge variant={getStatusBadge(selectedEnquiry.status)}>
                      {selectedEnquiry.status}
                    </Badge>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-light-border dark:border-dark-border">
                  <button
                    onClick={() => deleteEnquiry(selectedEnquiry.id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Enquiry
                  </button>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="flex-1 px-4 py-2 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnquiriesPage;
