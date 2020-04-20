//cart.js

export class Cart {

    constructor() {
        this.key = 'IT_SPA_CART';

        if (!this.exists()) {
            this.setItSpaCart([]);
        }
    }

    get() {
        const cookies = document.cookie.split(';');

        //zwraca ciąg znaków ("klucz=wartosc") lub undefined
        return cookies.find(cookie => cookie.startsWith(this.key));
    }

    exists() {
        return this.get() !== undefined;
    }

    getItSpaCart() {
        const cookieValue = this.get().slice(12);
        // "{foo:1, bar:[2, 3, 4]}" --> {foo:1, bar:[2,3,4]}
        const parsedValue = JSON.parse(cookieValue);

        return parsedValue;
    }

    setItSpaCart(value) {
        const stringifiedValue = JSON.stringify(value);

        document.cookie = `${this.key}=${stringifiedValue}`;
    }

    // zakładając, że koszyk jest tablicą
    add(item) {
        // dodaje produkt do koszyka
        const cartValue = this.getItSpaCart();
        this.setItSpaCart([...cartValue, item]); //cartValue.concat(item)


    }

    remove(item) {
        // usuwa produkt z koszyka
        const cartValue = this.getItSpaCart();
        const itemInCart = cartValue.findIndex(val => val.name === item.name);

        if(itemInCart !== -1) {
            cartValue.splice(itemInCart, 1);
            this.setItSpaCart(cartValue);
        }
    }
}