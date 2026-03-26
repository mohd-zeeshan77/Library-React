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

  interface UserForm {
    name: string;
    typeName: string;
  }
  interface UserItems extends UserForm {
    id: number;
  }
  interface MemberTypeDto {
    id: number;
    name: string;
  }
  interface IssuedForm {
    userName: string;
    bookName: string;
    dues: number;
  }
  interface IssuedItem extends IssuedForm {
    id: number;
    userType: string;
    issuedDate: string;
    returnDate: string;
    renewStatus: boolean | null;
    renewDate: string | null;
    isReturned: boolean | null;
  }
}
