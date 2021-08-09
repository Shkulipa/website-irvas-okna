import checkNumInputs from "./checkNumInpits";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: "Загрузка...",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failuer: "Что-то пошло не так..."
    };

    const postDate = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        })
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formDate = new FormData(item);
            if(item.getAttribute("data-calc") === "end") {
                for (let key in state) {
                    formDate.append(key, state[key]);
                }
            }

            postDate('assets/server.php', formDate)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failuer;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        if (item.getAttribute("data-calc") === "end") {
                            const formEnd = document.querySelector('form[data-calc="end"]');
                            const windows = document.querySelectorAll('[data-modal]');

                            formEnd.style.display = 'none';
                            windows.forEach( item => {
                                item.style.display = 'none'
                            });
                        }
                    }, 2e3);
                });
        });
    })

};

export default forms;