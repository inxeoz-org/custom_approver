import { API_BASE } from "$lib/env.js";
import { get } from "svelte/store";
// import type { DevoteeeProfile, Protocol, Companion } from "@src/app.js";

const APPROVER = `${API_BASE}/api/method/custom_booking.custom_booking.doctype.approver.`;
// Import store functions for logout
import { auth_token, user_logged_in } from "@src/store.js";
import { goto } from "$app/navigation";

export async function loginCheck(phone: string) {
  try {
    const res = await fetch(APPROVER + "approver.approver_login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("loginCheck:", err);
    return null;
  }
}

export async function verifyOtpLogin(phone: string, otp: string) {
  try {
    const res = await fetch(APPROVER + "approver.approver_login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("verifyOtpLogin:", err);
    return null;
  }
}

// Profile APIs
export async function getApproverProfile() {
  try {
    const token = get(auth_token);
    const res = await fetch(APPROVER + "profile.profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return await res.json();
  } catch (err: any) {
    console.error("get approver Profile:", err);
    return null;
  }
}

export async function updateProfile(profileData: any) {
  try {
    const token = get(auth_token);
    const res = await fetch(APPROVER + "profile.update_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(profileData),
    });
    return await res.json();
  } catch (err: any) {
    console.error("update Profile:", err);
    return null;
  }
}

// Phone Update APIs
export async function requestUpdatePhone(newPhone: string) {
  try {
    const token = get(auth_token);
    const res = await fetch(APPROVER + "profile.update_cred", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ new_phone: newPhone }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("request UpdatePhone:", err);
    return null;
  }
}

export async function updatePhone(newPhone: string, otpPhone: string) {
  try {
    const token = get(auth_token);
    const res = await fetch(APPROVER + "profile.update_cred", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ new_phone: newPhone, otp_phone: otpPhone }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("update Phone:", err);
    return null;
  }
}

// Email Update APIs
export async function requestUpdateEmail(newEmail: string) {
  try {
    const token = get(auth_token);
    const res = await fetch(APPROVER + "profile.update_cred", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ new_email: newEmail }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("requestUpdateEmail:", err);
    return null;
  }
}

export async function updateEmail(newEmail: string, otpEmail: string) {
  try {
    const token = get(auth_token);
    const res = await fetch(APPROVER + "profile.update_cred", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ new_email: newEmail, otp_email: otpEmail }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("updateEmail:", err);
    return null;
  }
}

export async function getAppointment(appointmentId: string) {
  try {
    const token = get(auth_token);
    const res = await fetch(APPROVER + "appointment.get_appointment_details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ appointment_id: appointmentId }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("getAppointment:", err);
    return null;
  }
}

export async function approveAppointment(appointmentId: string) {
  try {
    const token = get(auth_token);
    const res = await fetch(
      APPROVER + "appointment.apply_action_on_appointment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          action: "Approve",
        }),
      },
    );
    return await res.json();
  } catch (err: any) {
    console.error("action on Appointment:", err);
    return null;
  }
}

export async function rejectAppointment(appointmentId: string) {
  try {
    const token = get(auth_token);
    const res = await fetch(
      APPROVER + "appointment.apply_action_on_appointment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          action: "Reject",
        }),
      },
    );
    return await res.json();
  } catch (err: any) {
    console.error("action on Appointment:", err);
    return null;
  }
}

export async function cancelAppointment(appointmentId: string) {
  try {
    const token = get(auth_token);
    const res = await fetch(
      APPROVER + "appointment.apply_action_on_appointment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          action: "Cancel",
        }),
      },
    );
    return await res.json();
  } catch (err: any) {
    console.error("action on Appointment:", err);
    return null;
  }
}

export async function getAppointmentList(params?: {
  limitStart?: number;
  pageLength?: number;
  darshan_type?: string;
  workflow_state?: string;
}) {
  try {
    const token = get(auth_token);
    const res = await fetch(APPROVER + "appointment.list_of_vip_appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(params || {}),
    });
    return await res.json();
  } catch (err: any) {
    console.error("getAppointmentList:", err);
    return null;
  }
}

export async function getAppointmentStats() {
  try {
    const token = get(auth_token);
    const res = await fetch(APPROVER + "appointment.get_appointment_stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return await res.json();
  } catch (err: any) {
    console.error("err", err);
    return null;
  }
}
