exports.getOneBook = async (parent, args) => {
  const {id} = args;
  const existingBook = await Book.findOne({_id: id});
  return existingBook;
};
