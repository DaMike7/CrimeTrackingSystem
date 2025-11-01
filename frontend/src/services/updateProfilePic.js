// Convert file to base64 for upload
const handleProfilePicUpload = async (file) => {
    const formData = new FormData();
    formData.append('profilePic', file);
    
    // Or if sending as base64:
    const reader = new FileReader();
    reader.onloadend = async () => {
        const base64String = reader.result;
        
        const response = await fetch('/api/update-profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                profilePic: base64String
            })
        });
        
        const result = await response.json();
        console.log('Profile updated:', result);
    };
    reader.readAsDataURL(file);
};