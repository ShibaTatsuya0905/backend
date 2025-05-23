const otpStore = new Map(); 

const OTP_EXPIRY_MINUTES = 10; 
const MAX_OTP_ATTEMPTS = 5; 

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
}

function storeOtp(email, userData) {
    const otp = generateOtp();
    const expiresAt = Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;
    otpStore.set(email, { otp, expiresAt, attempts: 0, isVerified: false, userData });
    console.log(`[DEV ONLY] OTP for ${email}: ${otp}`);
    return otp;
}

function verifyOtp(email, receivedOtp) {
    const entry = otpStore.get(email);

    if (!entry) {
        return { success: false, message: 'Mã OTP không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.' };
    }

    if (Date.now() > entry.expiresAt) {
        otpStore.delete(email); 
        return { success: false, message: 'Mã OTP đã hết hạn. Vui lòng yêu cầu OTP mới.' };
    }

    if (entry.attempts >= MAX_OTP_ATTEMPTS) {
        otpStore.delete(email); 
        return { success: false, message: 'Bạn đã nhập sai OTP quá nhiều lần. Vui lòng yêu cầu OTP mới.' };
    }

    if (entry.otp === receivedOtp) {
        entry.isVerified = true;
        otpStore.set(email, entry); 
        return { success: true, message: 'Xác thực OTP thành công.', userData: entry.userData };
    } else {
        entry.attempts += 1;
        otpStore.set(email, entry); 
        return { success: false, message: `Mã OTP không đúng. Bạn còn ${MAX_OTP_ATTEMPTS - entry.attempts} lần thử.` };
    }
}

function getVerifiedUserData(email) {
    const entry = otpStore.get(email);
    if (entry && entry.isVerified) {
        return entry.userData;
    }
    return null;
}

function removeOtpEntry(email) {
    otpStore.delete(email);
    console.log(`OTP entry for ${email} removed.`);
}

setInterval(() => {
    const now = Date.now();
    let cleanedCount = 0;
    for (const [email, entry] of otpStore.entries()) {
        if (now > entry.expiresAt) {
            otpStore.delete(email);
            cleanedCount++;
        }
    }
    if (cleanedCount > 0) {
        console.log(`Cleaned up ${cleanedCount} expired OTP entries.`);
    }
}, 5 * 60 * 1000); 

module.exports = { storeOtp, verifyOtp, removeOtpEntry, getVerifiedUserData };