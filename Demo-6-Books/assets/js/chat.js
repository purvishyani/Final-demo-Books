
// Create the JSON structure
const BooksData = {
    author :"Purvi",
    authorId: 1,
    bookName: "The God of small things",
    sections: [
      {
        sectionId: 1,
        name: "Section-1",
        subsections: [     
          { subId:"1", name: "Sub-sec-1", children: [] },
          { subId:"2", name: "Sub-sec-2", children: [{ childId:"1",name: "child-1", children: [] }, { childId:"2",name: "child-2", children: [] }] },
          { subId:"3", name: "Sub-sec-3", children: [] }
        ]
      },
      {
        sectionId: 2,
        name: "Section-2",  
        subsections: [
          { subId:"1", name: "Sub-sec-1", children: [{ childId:"1",name: "child-1", children: [] }, {childId:"2", name: "child-2", children: [] }] }
        ]
      },
      {
        sectionId: 3,
        name: "Section-3",
        subsections: [
          { subId:"1", name: "Sub-sec-1", children: [] },
          { subId:"2", name: "Sub-sec-2", children: [] },
          { subId:"3", name: "Sub-sec-3", children: [{ childId:"1",name: "child-1", children: [] }] }
        ]
      }
    ]
  };
  
  