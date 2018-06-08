var assert = chai.assert;

describe('taskStorage', function() {
    describe('#create()', function() {
        it('建立一筆「待辦事項」', function() {

            // Arrange 建立測試物件、測試資料
            taskTitle = '學習 JavaScript 單元測試';

            // Act 呼叫測試方法
            taskStorage.create(taskTitle);

            // Assert 驗證結果是否符合預期
            expect = '學習 JavaScript 單元測試';

            newtTask = taskStorage.getNewestTask();

            assert.equal(expect, newtTask.title, '成功建立一筆待辦事項');
        });
    });
});
