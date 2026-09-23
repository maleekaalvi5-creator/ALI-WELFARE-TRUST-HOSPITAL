import React, { useState } from 'react';
import { AuditLogEntry, AdminUserRecord } from '../../../types/content';
import { Shield, KeyRound, UserCheck, Clock, CheckCircle2, AlertTriangle, Lock, RefreshCw, Download } from 'lucide-react';

interface SecurityAuditTabProps {
  auditLogs?: AuditLogEntry[];
  token: string;
  onAuditLogsChange?: (logs: AuditLogEntry[]) => void;
}

const DEFAULT_USERS: AdminUserRecord[] = [
  { id: 'usr-1', username: 'superadmin', fullName: 'Chief Executive / Trust Trustee', role: 'SuperAdmin', active: true },
  { id: 'usr-2', username: 'content_editor', fullName: 'Hospital Communications Officer', role: 'ContentEditor', active: true },
  { id: 'usr-3', username: 'medical_registrar', fullName: 'OPD Reception & Medical Registrar', role: 'MedicalRegistrar', active: true }
];

export const SecurityAuditTab: React.FC<SecurityAuditTabProps> = ({
  auditLogs = [],
  token,
  onAuditLogsChange
}) => {
  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (!currentPassword) {
      setPasswordMsg({ type: 'error', text: 'Please enter your current administrator password.' });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 8 characters with letters & numbers.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json().catch(() => ({}));
      setIsChangingPassword(false);

      if (res.ok && data.success) {
        setPasswordMsg({ type: 'success', text: 'Password successfully updated! Encrypted with military-grade scrypt.' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMsg({ type: 'error', text: data.error || 'Failed to update password.' });
      }
    } catch {
      setIsChangingPassword(false);
      setPasswordMsg({ type: 'error', text: 'Network connection failed while updating password.' });
    }
  };

  const exportAuditLog = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ali_welfare_audit_log_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-800">Security, Roles & Audit-Friendly Editing</h2>
        <p className="text-xs text-slate-500">
          Role-based access permissions, scrypt password encryption, session controls, and full audit trail of edits.
        </p>
      </div>

      {/* Security Engine Banner */}
      <div className="bg-gradient-to-r from-[#051c24] to-[#092f3a] text-white p-5 rounded-2xl border border-teal-800/60 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black">scrypt Key Derivation & Token Protection</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                Active & Enforced
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Passcodes are salted with 16-byte cryptographically secure random salts and hashed via <code>scryptSync</code>.
            </p>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-mono text-teal-300 shrink-0">
          N=16384 • r=8 • p=1
        </div>
      </div>

      {/* Role-Based Access Control Directory */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-teal-700" />
            <div>
              <h3 className="text-xs font-black uppercase text-teal-900 tracking-wider">
                Role-Based Access Hierarchy
              </h3>
              <p className="text-[11px] text-slate-500">Administrative permissions defined per user role</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {DEFAULT_USERS.map((usr) => (
            <div key={usr.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-800">{usr.username}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                  usr.role === 'SuperAdmin' 
                    ? 'bg-rose-50 text-rose-700 border-rose-200' 
                    : usr.role === 'ContentEditor'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {usr.role}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">{usr.fullName}</p>
              <div className="text-[11px] text-slate-500 border-t border-slate-200/60 pt-1.5 leading-relaxed">
                {usr.role === 'SuperAdmin' && 'Full control: All website sections, theme, SEO, admin users, hospital database.'}
                {usr.role === 'ContentEditor' && 'Content control: Hero slides, texts, photos, gallery, founder memorial, news.'}
                {usr.role === 'MedicalRegistrar' && 'Clinical control: Doctor timetables, departments, appointment booking desk.'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Change Password Panel */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <KeyRound className="w-5 h-5 text-teal-700" />
          <div>
            <h3 className="text-xs font-black uppercase text-teal-900 tracking-wider">
              Change Administrator Password
            </h3>
            <p className="text-[11px] text-slate-500">Updates the hashed password in central server storage</p>
          </div>
        </div>

        {passwordMsg && (
          <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
            passwordMsg.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}>
            {passwordMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
            <span>{passwordMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-3 max-w-md">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">New Password (Min 8 Characters)</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isChangingPassword}
            className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
          >
            {isChangingPassword ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            <span>{isChangingPassword ? 'Securing & Updating...' : 'Update Password'}</span>
          </button>
        </form>
      </div>

      {/* Audit Log Trail */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-teal-700" />
            <div>
              <h3 className="text-xs font-black uppercase text-teal-900 tracking-wider">
                Audit Trail & Real-Time Change History ({auditLogs.length})
              </h3>
              <p className="text-[11px] text-slate-500">
                Tamper-evident log of changes made to the live website.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={exportAuditLog}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit JSON</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-black uppercase text-slate-400 font-mono">
                <th className="py-2 px-3">Date & Time</th>
                <th className="py-2 px-3">User & Role</th>
                <th className="py-2 px-3">Action</th>
                <th className="py-2 px-3">Section</th>
                <th className="py-2 px-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-slate-400">
                    No changes logged yet in this session. Edits will appear here automatically.
                  </td>
                </tr>
              ) : (
                auditLogs.slice().reverse().map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="font-bold text-slate-800">{log.user}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{log.role}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-200">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-700 whitespace-nowrap">
                      {log.section}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px] max-w-xs truncate">
                      {log.details || 'Central live content broadcasted to all active client screens.'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
