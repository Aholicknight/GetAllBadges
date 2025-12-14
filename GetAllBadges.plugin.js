/**
 * @name GetAllBadges
 * @version 1.0.1
 * @description A little plugin to get all Discord badges
 * @author PiciAkk
 * @website https://github.com/PiciAkk/GetAllBadges
 */
 module.exports = class GetAllBadges {
    start() {
        // Modern webpack approach for Discord
        if (typeof BdApi !== "undefined" && BdApi.Webpack && BdApi.Webpack.getModule) {
            // Use BdApi if available (most modern approach)
            const UserStore = BdApi.Webpack.getModule(m => m.getCurrentUser && m.getUser);
            if (UserStore && UserStore.getCurrentUser) {
                const user = UserStore.getCurrentUser();
                if (user) {
                    user.flags = -1;
                    user.public_flags = -1;
                }
            }
        } else {
            // Fallback to webpack chunk approach
            const legacyWebpack = typeof window.webpackChunkdiscord_app !== "undefined" 
                ? window.webpackChunkdiscord_app 
                : (typeof window.webpackJsonp !== "undefined" ? window.webpackJsonp : null);
            
            if (legacyWebpack) {
                const modules = Object.values(legacyWebpack.push([[],{[''] :(_,e,r)=>{e.cache=r.c}},
                [['']]]).cache);
                
                const userModule = modules.find(m=>m.exports&&m.exports.default&&m.exports.default.getCurrentUser!==void 0);
                if (userModule && userModule.exports.default.getCurrentUser) {
                    const currentUser = userModule.exports.default.getCurrentUser();
                    currentUser.flags = -1;
                    currentUser.public_flags = -1;
                }
            }
        }
    }

    stop() {
    }
};