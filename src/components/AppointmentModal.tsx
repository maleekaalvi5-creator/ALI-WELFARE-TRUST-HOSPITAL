import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Stethoscope, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  ShieldAlert, 
  MessageCircle, 
  FileText,
  Printer,
  ChevronRight
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, HOSPITAL_INFO } from '../data/hospitalData';
import { Appointment } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDepartmentId?: string;
  initialDoctorId?: string;
  onAppointmentBooked: (appointment: Appointment) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialDepartmentId,
  initialDoctorId,
  onAppointmentBooked,
}) => {
  const [departmentId, setDepartmentId] = useState<string>(initialDepartmentId || DEPARTMENTS[0].id);
  const [doctorId, setDoctorId] = useState<string>(initialDoctorId || 'any');
  const [patientName, setPatientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [date, setDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('Morning (09:00 AM - 01:00 PM)');
  const [notes, setNotes] = useState<string>('');
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Sync state when props change
  useEffect(() => {
    if (initialDepartmentId) {
      setDepartmentId(initialDepartmentId);
    }
    if (initialDoctorId) {
      setDoctorId(initialDoctorId);
    }
  }, [initialDepartmentId, initialDoctorId]);

  if (!isOpen) return null;

  const filteredDoctors = DOCTORS.filter((d) => d.departmentId === departmentId);
  const selectedDept = DEPARTMENTS.find((d) => d.id === departmentId) || DEPARTMENTS[0];
  const selectedDoc = DOCTORS.find((d) => d.id === doctorId);

  const timeSlots = [
    'Morning (09:00 AM - 01:00 PM)',
    'Afternoon (02:00 PM - 05:00 PM)',
    'Evening (06:00 PM - 09:00 PM)',
    'Emergency 24/7 Priority Ward'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim()) {
      alert('Please provide patient name and contact telephone number.');
      return;
    }

    const tokenNumber = Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      id: `AWT-${new Date().getFullYear()}-${tokenNumber}`,
      patientName: patientName.trim(),
      phone: phone.trim(),
      age: age || 'Not specified',
      gender,
      departmentId,
      departmentName: selectedDept.name,
      doctorId: selectedDoc ? selectedDoc.id : 'duty-officer',
      doctorName: selectedDoc ? selectedDoc.name : 'Consultant on Duty',
      date,
      timeSlot,
      notes: notes.trim(),
      isEmergency,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    onAppointmentBooked(newAppointment);
    setConfirmedBooking(newAppointment);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#087f8c', '#11a7a0', '#d7b56d']
    });
  };

  const getWhatsAppNotificationUrl = (appt: Appointment) => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Ali Welfare Trust Hospital Qila Didar Singh,\n\nI have booked an OPD appointment online:\n- Token #: ${appt.id}\n- Patient: ${appt.patientName}\n- Department: ${appt.departmentName}\n- Doctor: ${appt.doctorName}\n- Date: ${appt.date} (${appt.timeSlot})\n- Phone: ${appt.phone}\n${appt.notes ? `- Notes: ${appt.notes}\n` : ''}\nPlease confirm my appointment slot. Thank you!`
    );
    return `https://wa.me/${HOSPITAL_INFO.whatsapp}?text=${text}`;
  };

  const resetAndClose = () => {
    setConfirmedBooking(null);
    setPatientName('');
    setPhone('');
    setNotes('');
    setAge('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto relative my-auto animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBooking ? (
          /* Confirmation View */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Appointment Token Confirmed
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#092f3a] mt-2 mb-1">
              Token #{confirmedBooking.id}
            </h3>
            <p className="text-xs sm:text-sm text-[#6b7f84] mb-6">
              Saved successfully for Ali Welfare Trust Hospital, Qila Didar Singh.
            </p>

            {/* Token Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-2.5 mb-6 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-[#6b7f84]">Patient Name:</span>
                <span className="font-bold text-[#092f3a]">{confirmedBooking.patientName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-[#6b7f84]">Department:</span>
                <span className="font-bold text-[#087f8c]">{confirmedBooking.departmentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-[#6b7f84]">Doctor / Specialist:</span>
                <span className="font-bold text-[#092f3a]">{confirmedBooking.doctorName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-[#6b7f84]">Date & Slot:</span>
                <span className="font-bold text-[#092f3a]">{confirmedBooking.date} • {confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#6b7f84]">Contact:</span>
                <span className="font-bold text-[#092f3a]">{confirmedBooking.phone}</span>
              </div>
            </div>

            {/* Instructions */}
            <p className="text-xs text-[#6b7f84] mb-6 bg-teal-50 p-3 rounded-xl border border-teal-100">
              📍 Please arrive at least 15 minutes before your scheduled slot with your previous medical records at our Main Reception, Qila Didar Singh.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={getWhatsAppNotificationUrl(confirmedBooking)}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-1/2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={() => window.print()}
                className="w-full sm:w-1/2 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-[#092f3a] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Appointment Token</span>
              </button>
            </div>

            <button
              onClick={resetAndClose}
              className="mt-5 text-xs font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer"
            >
              Done & Return to Website
            </button>
          </div>
        ) : (
          /* Form View */
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#087f8c]">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#092f3a]">
                  Book Doctor Consultation
                </h3>
                <p className="text-xs text-[#6b7f84]">
                  Online OPD Registration • Ali Welfare Trust Hospital
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Emergency Banner Toggle */}
              <div 
                onClick={() => setIsEmergency(!isEmergency)}
                className={`p-3 rounded-2xl border transition-colors cursor-pointer flex items-center justify-between ${
                  isEmergency
                    ? 'bg-rose-50 border-rose-300 text-rose-900'
                    : 'bg-slate-50 border-slate-200 text-[#12343b] hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className={`w-5 h-5 ${isEmergency ? 'text-rose-600' : 'text-slate-400'}`} />
                  <div>
                    <p className="text-xs font-bold">Is this an Acute Emergency / Trauma?</p>
                    <p className="text-[11px] text-[#6b7f84]">
                      Emergency cases are admitted immediately without waiting.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                  className="w-4 h-4 accent-rose-600 cursor-pointer"
                />
              </div>

              {/* Department & Doctor Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#092f3a] mb-1.5">
                    Select Clinical Department *
                  </label>
                  <select
                    value={departmentId}
                    onChange={(e) => {
                      setDepartmentId(e.target.value);
                      setDoctorId('any');
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-[#092f3a] focus:outline-none focus:border-[#087f8c]"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name} ({dept.urduName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#092f3a] mb-1.5">
                    Select Specialist Doctor
                  </label>
                  <select
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-[#092f3a] focus:outline-none focus:border-[#087f8c]"
                  >
                    <option value="any">Any Available Specialist On Duty</option>
                    {filteredDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} - {doc.specialty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Doctor Schedule Information Card */}
              {selectedDoc && (
                <div className="bg-teal-50 border border-teal-200/80 rounded-2xl p-3 text-xs text-[#092f3a]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-extrabold text-[#087f8c]">{selectedDoc.name}</span>
                      <span className="text-slate-500 font-semibold ml-1.5">({selectedDoc.specialty})</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-extrabold text-[11px]">
                      ★ 5.0 Rated (Rated 5 out of 5)
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-700 font-medium">
                    <span><strong>Days:</strong> {selectedDoc.consultationDays}</span>
                    <span><strong>Timing:</strong> {selectedDoc.timing}</span>
                  </div>
                  <div className="mt-1 text-slate-500 text-[11px]">
                    <strong>Qualifications:</strong> {selectedDoc.qualification}
                  </div>
                </div>
              )}

              {/* Date & Time Slot Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#092f3a] mb-1.5">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-[#092f3a] focus:outline-none focus:border-[#087f8c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#092f3a] mb-1.5">
                    Preferred Timing Shift *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-[#092f3a] focus:outline-none focus:border-[#087f8c]"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Details Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#092f3a] mb-1.5">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Usman"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-[#092f3a] focus:outline-none focus:border-[#087f8c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#092f3a] mb-1.5">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-[#092f3a] focus:outline-none focus:border-[#087f8c]"
                  />
                </div>
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#092f3a] mb-1.5">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 35"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-[#092f3a] focus:outline-none focus:border-[#087f8c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#092f3a] mb-1.5">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-[#092f3a] focus:outline-none focus:border-[#087f8c]"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Symptoms / Notes */}
              <div>
                <label className="block text-xs font-bold text-[#092f3a] mb-1.5">
                  Brief Medical Symptoms / Reason for Visit
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Kidney routine dialysis consultation, eye examination for blurred vision, fever for 3 days..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-[#092f3a] focus:outline-none focus:border-[#087f8c]"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-500 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#087f8c] hover:bg-[#045d67] text-white text-xs sm:text-sm font-bold shadow-md shadow-teal-900/20 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Appointment Token</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
