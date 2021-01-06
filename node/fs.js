function bad() {
  require('fs').readFile('/');
}
bad();
