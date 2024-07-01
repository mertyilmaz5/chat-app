export const getRandomAvatars = (count = 5) => {
    const avatars = [];
    while (avatars.length < count) {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        const avatarUrl = `https://avatar.iran.liara.run/public/${randomNum}`;
        if (!avatars.includes(avatarUrl)) {
            avatars.push(avatarUrl);
        }
    }
    return avatars;
};
