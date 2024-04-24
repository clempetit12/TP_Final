import { accountService } from "../screens/accountService";

export const getUserDetails = async () => {
    try {
        const userItem = accountService.printToken();

        if (!userItem) {
            console.log("No user found in AsyncStorage.");
            return null;
        }

        const token = JSON.parse(userItem);

        if (!token) {
            console.log("User token not found.");
            return null;
        }

        const base64Url = token.split('.')[1];
        if (!base64Url) {
            console.log("Invalid token: missing payload.");
            return null;
        }

        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        
        const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString('utf-8'));

        const decoded = JSON.parse(jsonPayload);

        return { 
            name: decoded.sub, 
            role: decoded.roles,
            username: decoded.username 
        };
    } catch (error) {
        console.error("Error getting user details:", error);
        return null;
    }
};

