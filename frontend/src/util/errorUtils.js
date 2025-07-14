export const extractErrorMessages = (error) => {
    if(!error) return null;

    if(error.response?.data){
        const data = error.response.data;

        // handle azod validation errors

        if(data.errors && Array.isArray(data.errors)){
            return data.errors.map(err => err.message).join(',');
        }
    

    // handle single error messages

    if (data.message){
        return data.message;
    }

    // handle ERROR FIELD 

    if (data.error){
        return data.error
    }

    }

    // Handle Network error

    if (error.response && !error.response){
        return 'Network Error, Please check your connection'
    }

    // Fall back to general error
    if(error.message){
        return error.message
    }

    return 'Something went is wrong. Please try again'
}