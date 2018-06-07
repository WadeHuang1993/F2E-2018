(function (document, window, index) {

    "use strict";

    var store = {};
    if ('undefined' != typeof(sessionStorage.tasks)) {
        store = JSON.parse(sessionStorage.tasks);
    }

    var taskStorage = function (store) {

        taskStorage = function (store) {

            var store = store;

            /**
             * 取得 store 最新 id
             *
             * @returns {number} id
             */
            function getStoreId() {
                var id = 0;
                if ('undefined' != typeof (store.id)) {
                    id = store.id;
                }

                return id;
            }

            function getNextStoreId() {
                var id = getStoreId();

                return ++id;
            }

            /**
             * 設置 tasks Storage
             */
            function setTaskStorage() {

                sessionStorage.tasks = JSON.stringify(store);
            }

            /**
             * 增加 task store 之 id 流水號
             *
             * @param id number
             */
            function updateStoreId(id) {
                store.id = id;
            }

            /**
             * 新增一筆 task 至 task storage
             *
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

        return new taskStorage(store);
    };

    window.taskStorage = taskStorage(store);

})(document, window, 0);