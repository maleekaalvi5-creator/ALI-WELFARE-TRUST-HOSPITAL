import React from 'react';
import { FileText, Calendar, Clock, User, Trash2, MessageCircle, X, CheckCircle } from 'lucide-react';
import { Appointment } from '../types';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onBookNew: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onBookNew,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#087f8c]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#092f3a]">
                My Booked Appointments
              </h3>
              <p className="text-xs text-[#6b7f84]">
                Stored locally on your current device
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Appointments */}
        {appointments.length === 0 ? (
          <div className="text-center py-10">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-[#092f3a]">No active appointments found</p>
            <p className="text-xs text-[#6b7f84] mt-1 mb-5">
              You haven't booked any OPD consultation slots yet.
            </p>
            <button
              onClick={() => {
                onClose();
                onBookNew();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#087f8c] text-white text-xs font-bold shadow-md cursor-pointer hover:bg-[#045d67]"
            >
              Book First Appointment
            </button>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="bg-slate-50 hover:bg-teal-50/20 p-4 rounded-2xl border border-slate-200 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-100 text-[#087f8c]">
                      Token #{appt.id}
                    </span>
                    <h4 className="text-base font-bold text-[#092f3a] mt-1">
                      {appt.patientName}
                    </h4>
                  </div>

                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Confirmed
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#6b7f84] mb-3">
                  <div>
                    <span className="font-semibold text-[#092f3a]">Dept: </span>
                    {appt.departmentName}
                  </div>
                  <div>
                    <span className="font-semibold text-[#092f3a]">Doctor: </span>
                    {appt.doctorName}
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-[#092f3a]">Schedule: </span>
                    {appt.date} • {appt.timeSlot}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                  <a
                    href={`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=${encodeURIComponent(
                      `Hello Ali Welfare Trust Hospital, checking token ${appt.id} for ${appt.patientName}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Hospital</span>
                  </a>

                  <button
                    onClick={() => onCancelAppointment(appt.id)}
                    className="text-xs text-rose-500 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              onClose();
              onBookNew();
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#092f3a] text-xs font-bold cursor-pointer"
          >
            + Book Another Token
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#087f8c] text-white text-xs font-bold cursor-pointer hover:bg-[#045d67]"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
