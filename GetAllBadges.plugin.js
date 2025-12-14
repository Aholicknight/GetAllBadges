/**
 * @name GetAllBadges
 * @version 1.0.0
 * @description A little plugin to get all Discord badges
 * @author PiciAkk
 * @website https://github.com/PiciAkk/GetAllBadges
 */
 module.exports = class GetAllBadges {
    start() {
        // Modern webpack approach for Discord
        const wpRequire = typeof BdApi !== "undefined" && BdApi.Webpack && BdApi.Webpack.getModule 
            ? null 
            : (typeof window.webpackChunkdiscord_app !== "undefined" 
                ? window.webpackChunkdiscord_app 
                : window.webpackJsonp);
        
        let modules;
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
        } else if (wpRequire) {
            // Fallback to webpack chunk approach
            modules = Object.values(wpRequire.push([[],{[''] :(_,e,r)=>{e.cache=r.c}},
            [['']]]).cache);
            
            const userModule = modules.find(m=>m.exports&&m.exports.default&&m.exports.default.getCurrentUser!==void 0);
            if (userModule && userModule.exports.default.getCurrentUser) {
                userModule.exports.default.getCurrentUser().flags=-1;
                userModule.exports.default.getCurrentUser().public_flags=-1;
            }
        }
    }

    stop() {
    }
};