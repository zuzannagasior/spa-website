import $ from 'jquery';
import {
    createCartSum
} from '../cart/cart-sum';

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
        console.log('item', item);
        const cartValue = this.getItSpaCart();
        this.setItSpaCart([...cartValue, item]); //cartValue.concat(item)
        this.updateCartSum();
    }

    remove(item) {
        // usuwa produkt z koszyka
        const cartValue = this.getItSpaCart();
        const itemInCart = cartValue.findIndex(val => val.name === item.name);

        if(itemInCart !== -1) {
            cartValue.splice(itemInCart, 1);
            this.setItSpaCart(cartValue);
        }
        this.updateCartSum();
    }

    delete(item) {
        // usuwa wszystkie produkty tego rodzaju z koszyka
        const cartValue = this.getItSpaCart();
        const cartValueFiltered = cartValue.filter(cartItem => cartItem.name !== item.name);
        
        this.setItSpaCart(cartValueFiltered);
        this.updateCartSum();
    }

    showCartSum(action) {
        const cartSum = $('.cartSum');
        if (action === 'show') {
            cartSum.addClass("showCart");
        } else {
            cartSum.removeClass("showCart");
        }
    }

    updateCartSum() {
        const cartSum = createCartSum();
        $('.cartSum').remove();
        $('nav').append(cartSum);
    }

    getNumberOfItems(name) {
        const filteredCart = this.getItSpaCart().filter(item => item.name === name);
        return filteredCart.length;
    }

    getCartSum() {
        let sum = 0;
        this.getItSpaCart().forEach(item => {
            sum = sum + item.price;
        });
        return sum;
    }
}