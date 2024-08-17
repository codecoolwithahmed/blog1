import { updateProfile, updatePassword } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';
import { auth } from './firebase.js';
const profileForm = document.getElementById('profileForm');
const passwordForm = document.getElementById('passwordForm');

profileForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const displayName = document.getElementById('displayName').value;
    const photoURL = document.getElementById('photoURL').value;

    try {
        await updateProfile(auth.currentUser, { displayName, photoURL });
        alert('Profile updated successfully');
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile');
    }
});

passwordForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }

    try {
        // For updating password, user must re-authenticate before updating password
        const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, newPassword);
        alert('Password updated successfully');
    } catch (error) {
        console.error('Error updating password:', error);
        alert('Error updating password');
    }
});