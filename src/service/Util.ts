class Util {
  static priceToString(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  static getToken() {
    return localStorage.getItem('auth_token');
  }

  static setToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  static logout() {
    localStorage.removeItem('auth_token');
  }

}

export default Util;
