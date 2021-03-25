// Stack Overflow helper function to format date
module.exports = {
  dateFormat: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },

}