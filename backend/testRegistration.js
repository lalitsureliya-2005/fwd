const http = require('http');

function testRegistration() {
    console.log('🧪 Testing Registration API...\n');
    
    const userData = JSON.stringify({
        fullName: "Mukhija C",
        email: "chiragmukhijaa.cs24@bmsce.ac.in",
        mobileNumber: "9034676425",
        password: "123456"
    });
    
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': userData.length
        }
    };
    
    const req = http.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                if (response.success) {
                    console.log('✅ REGISTRATION SUCCESSFUL!');
                    console.log('🎉 User registered successfully');
                    console.log('🔑 JWT Token generated');
                    console.log('📄 Response:', response);
                } else {
                    console.log('❌ REGISTRATION FAILED');
                    console.log('📄 Response:', response);
                }
            } catch (error) {
                console.log('❌ Error parsing response:', error.message);
                console.log('📄 Raw response:', data);
            }
        });
    });
    
    req.on('error', (error) => {
        console.log('❌ NETWORK ERROR:', error.message);
    });
    
    req.write(userData);
    req.end();
}

testRegistration();