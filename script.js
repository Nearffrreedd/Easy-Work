document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("addButton");
    const memosContainer = document.getElementById("memosContainer");

    // 备忘录数据，初始化为空数组
    const memos = [];

    // 添加新备忘录项
    addButton.addEventListener("click", function () {
        const memoText = prompt("请输入备忘录内容：");
        if (memoText) {
            const memo = {
                text: memoText,
                completed: false,
            };
            memos.unshift(memo); // 将新备忘录插入到数组最前面
            displayMemos();
        }
    });

    // 显示备忘录列表
    function displayMemos() {
        memosContainer.innerHTML = "";
        memos.forEach(function (memo, index) {
            const memoItem = document.createElement("div");
            memoItem.className = "memo";
            memoItem.innerHTML = `
                <input type="checkbox" id="memo${index}" ${memo.completed ? "checked" : ""}>
                <label for="memo${index}" class="${memo.completed ? "completed" : ""}">${memo.text}</label>
            `;
            memosContainer.appendChild(memoItem);

            // 添加勾选事件监听器
            const checkbox = memoItem.querySelector(`#memo${index}`);
            checkbox.addEventListener("change", function () {
                memo.completed = checkbox.checked;
                if (memo.completed) {
                    memoItem.querySelector("label").classList.add("completed");
                    // 移除已完成备忘录，并将其添加到数组末尾
                    const completedMemo = memos.splice(index, 1)[0];
                    memos.push(completedMemo);
                    displayMemos(); // 重新显示备忘录列表
                } else {
                    memoItem.querySelector("label").classList.remove("completed");
                }
            });
        });
    }

    // 初始显示备忘录列表
    displayMemos();
});
