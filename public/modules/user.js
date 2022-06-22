class User {

  constructor(id, username) {
    this.id = id;
    this.username = username;
  }

  toMap() {
    return {
      id: this.id,
      username: this.username
    }
  }
}