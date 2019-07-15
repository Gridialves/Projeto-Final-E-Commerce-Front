const container = document.querySelector('#box-clothes-items');

fetch('http://localhost:3000/bazar')
    .then(response => {
        return response.json();
    })
    .then(data => {
        data.forEach(addClothes => {
            const box = document.createElement('div');
            box.setAttribute('class', 'box-clothes');
            box.setAttribute('data-id', addClothes._id)

            const imagem = document.createElement('img');
            imagem.setAttribute('class', 'img-clothes');
            imagem.setAttribute('alt', addClothes.nome);
            imagem.setAttribute('width', '200px');
            imagem.setAttribute('src', addClothes.imagem)

            const body = document.createElement('div');
            body.setAttribute('class', 'box-clothes-body');

            const nome = document.createElement('p');
            nome.innerHTML = `${addClothes.nome}`

            const valor = document.createElement('p');
            valor.innerHTML = `R$: ${addClothes.valor}`
            valor.setAttribute('class', 'box-clothes-body-paragrafo-valor');

            const addCart = document.createElement('button');
            addCart.innerHTML = `Adicionar ao carrinho`
            addCart.setAttribute('class', 'box-clothes-btn');

            box.appendChild(imagem);
            box.appendChild(body);
            body.appendChild(nome);
            body.appendChild(valor);
            body.appendChild(addCart);
            container.appendChild(box);

            imagem.addEventListener('click', () => {
                window.location.href = "./bazarClothes.html?id=" + addClothes._id
            })

            addCart.addEventListener('click', () => {
                fetch(`http://localhost:3000/bazar/${addClothes._id}`, {
                    method: 'PUT',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ cart: true })
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
    })