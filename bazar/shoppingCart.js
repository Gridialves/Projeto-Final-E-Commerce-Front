
fetch('https://e-commerce-apiz-back.herokuapp.com/shopcart')
    .then(res => {
        return res.json();
    })
    .then(data => {
        const container2 = document.querySelector(".shopping-cart");
        data.forEach(shopCart => {

            const box = document.createElement('div');
            box.setAttribute('class', 'item');

            const button = document.createElement('div');
            button.setAttribute('class', 'buttons');

            const imageButton = document.createElement('img');
            imageButton.setAttribute('class', 'delete-btn');
            imageButton.setAttribute('src', "./assets/delete.png");

            const boxImage = document.createElement('div');
            boxImage.setAttribute('data-id', shopCart._id)

            const imagem = document.createElement('img');
            imagem.setAttribute('class', 'image');
            imagem.setAttribute('alt', shopCart.nome);
            imagem.setAttribute('src', shopCart.imagem);

            const description = document.createElement('div');
            description.setAttribute('class', 'description');

            const quantity = document.createElement('div');
            quantity.setAttribute('class', 'quantity');

            const quantityInput = document.createElement('input');
            quantityInput.setAttribute('value', '1');

            const valor = document.createElement('div');
            valor.innerHTML = `R$: ${shopCart.valor}`
            valor.setAttribute('class', 'total-price');


            box.appendChild(button);
            box.appendChild(boxImage);
            box.appendChild(description);
            box.appendChild(quantity);
            box.appendChild(valor);
            button.appendChild(imageButton);
            boxImage.appendChild(imagem);
            quantity.appendChild(quantityInput);
            container2.appendChild(box);

            imageButton.addEventListener('click', () => {
                fetch(`https://e-commerce-apiz-back.herokuapp.com/bazar/${shopCart._id}`, {
                    method: 'PUT',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ cart: false })
                })

                    .then(() => {
                        window.location.reload()

                    })

                    .catch(erro => {
                        console.log(erro)
                    })
            })
        });
    })
    .catch(erro => {
        console.log("Deu erro!!!", erro)
    });



