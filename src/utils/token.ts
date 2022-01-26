/**
 * 获取token
 * @returns 
 */
export const getToken = () => {
    // 使用cookie中存在的fisher_key获取
    const cookieArray: any[] = document.cookie.split(";")
    for (let i = 0; i < cookieArray.length; i++) {
        let name = cookieArray[i].split('=')[0]
        let value = cookieArray[i].split('=')[1]
        // 由于切割产生空格，先删除空格
        if (name.trim() === 'fisher_key') {
            if (value !== '') {
                return value
            }
        }
    }
}
