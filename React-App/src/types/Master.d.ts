declare namespace Master {
  interface BookForm {
    name: string;
    authorName: string;
    publisher: string;
    edition: string;
    price: number;
    categoryName: string;
    stock: number;
  }

  interface BookItem extends BookForm {
    id: number;
  }
  interface CategoryForm {
    name: string;
  }
  interface CategoryItem extends CategoryForm {
    id: number;
  }
}
