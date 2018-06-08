(function (document, window, index) {

    "use strict";

    /**
     * 取得 sessionStorage 的 tasks 資料
     *
     * 每次載入 taskStorage.js 時，自動解析 sessionStorage.tasks
     *
     * @type {{}}
     */
    var store = {};
    if ('undefined' != typeof(sessionStorage.tasks)) {
        store = JSON.parse(sessionStorage.tasks);
    }

    /**
     * 建構 taskStore 物件
     *
     * @param store
     * @returns {taskStorage}
     */
    var taskStorage = function (store) {

        /**
         * store 為 JSON.parse(sessionStorage.tasks) 解析後的物件。
         *
         * @access private
         */
        var store = store;

        /**
         * 取得 store 最新 id
         *
         * @access private
         * @returns {number} id
         */
        function getStoreId() {
            var id = 0;
            if ('undefined' != typeof (store.id)) {
                id = store.id;
            }

            return id;
        }

        /**
         * 取得下一個 Store id 流水號
         *
         * 供新增 task 用
         *
         * @access private
         * @returns {number}
         */
        function getNextStoreId() {
            var id = getStoreId();

            return ++id;
        }

        /**
         * 設置 tasks Storage
         *
         * @access private
         */
        function setTaskStorage() {

            sessionStorage.tasks = JSON.stringify(store);
        }

        /**
         * 增加 task store 之 id 流水號
         *
         * @access private
         * @param id number
         */
        function updateStoreId(id) {
            store.id = id;
        }

        /**
         * 新增一筆 task 至 task storage
         *
         * @access public
         * @param title
         */
        function create(title) {

            var id = getNextStoreId();

            store[id] = {
                title: title,
                deadline: new Date()
            };

            updateStoreId(id);

            setTaskStorage();
        }

        return {
            create: create
        }
    };

    // 在全局變數註冊 taskStorage 物件。
    window.taskStorage = new taskStorage(store);

})(document, window, 0);