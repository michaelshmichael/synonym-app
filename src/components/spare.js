const addLanguage = () => {
    console.log(userData)
    let updatedLanguages = userData.learningLanguage.concat('A new language')
    setUserData((prevState) => ({
        ...prevState,
        learningLanguage: updatedLanguages
    }));
    updateUserLanguage();
};

async function updateUserLanguage() {
    const requestBody = JSON.stringify(userData);
    console.log(uniqueId)
    console.log(requestBody)
    try {
        const updatedUser = await axios.put(`https://app.yawe.dev/api/1/ce/user-data-endpoint?key=ecee2707727b40f0b5c742371df2fa8b&uniqueId=${uniqueId}`, 
        { data: requestBody},
        { withCredentials: true },
        { headers: {'Content-Type': 'application/json'}}
        )
        console.log('Updated user' + updatedUser.data.learningLanguage)
        //setUserData(updatedUser)
    } catch (error) {
        console.log(error)
    }
};