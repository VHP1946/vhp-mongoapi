MongoDB API

This project will end up replacing our current datamart as the primary data mart. Once finished it will sit after the core and be able to scale horizontally with traffic. Most of the information (Schemes / Models) will be noted on in the Project OneNote.


- [Requests](#requests)
- [Responses](#responses)


# Requests

Request will be made very similar to that of the original mart. Better yet, we are able to remove some of the fields in the pack. Even if an application uses the old pack config, they should not have any problems as the back-end will clean any uneeded properties present in the pack.

pack:{
  db: 'database name'
  collect: 'collection name'

  methd: 'QUERY | REMOVE | INSERT | UPDATE'
  
  options: {
    QUERY:{
      query:{id:'itemid'}
    }
    REMOVE:{
      query:{id:'itemid'}
      multi: TRUE | FALSE
    }
    UPDATE:{
      query:{id:'itemid'}
      update:{$set:item}
      options:{}
    }
    INSERT:{
      docs: [items] || {item}
    }
  }
}

## Responses

options.query must be a single object; will not accept an array
options.doc may be either a single object or an array


Remove:{
  good: RESULT > { acknowledged: true, deletedCount: 1 } 
  bad (doc does not exist): RESULT > { acknowledged: true, deletedCount: 0 }

  (array): ::NO RESPONSE::
}


Update:{
  good: RESULT > {
          acknowledged: true,
          modifiedCount: 1,
          upsertedId: null,
          upsertedCount: 0,
          matchedCount: 1
        }
  "failed" (doc already updated): RESULT > {
                                    acknowledged: true,
                                    modifiedCount: 0,
                                    upsertedId: null,
                                    upsertedCount: 0,
                                    matchedCount: 1
                                  }
}


Find:{
  good: RESULT > [
              {
                _id: new ObjectId("64498ece88c3044762686fd0"),
                empID: '07',
                fName: 'First',
                lName: 'Last',
                tasks: [],
                goals: [],
                __v: 0
              }
            ]
  bad (doc does not exist): RESULT > []

}


Insert:{
  good (single doc): RESULT > [
                        {
                          empID: '07',
                          fName: 'test',
                          lName: 'guy',
                          tasks: [],
                          goals: [],
                          _id: new ObjectId("64498dd492bbc6fc70b8cec2"),
                          __v: 0
                        }
                      ]

  good (array of docs): RESULT > [
                              {
                                empID: '08',
                                fName: 'test',
                                lName: 'guy',
                                tasks: [],
                                goals: [],
                                _id: new ObjectId("644a759d6d689ac841293942"),
                                __v: 0
                              },
                              {
                                empID: '09',
                                fName: 'test',
                                lName: 'guy',
                                tasks: [],
                                goals: [],
                                _id: new ObjectId("644a759d6d689ac841293943"),
                                __v: 0
                              },
                              {
                                empID: '10',
                                fName: 'test',
                                lName: 'guy',
                                tasks: [],
                                goals: [],
                                _id: new ObjectId("644a759d6d689ac841293944"),
                                __v: 0
                              }
                            ]

  bad (doc already exists): ::NO RESPONSE::


  bad (one doc exists in array): ::NO RESPONSE::
}

# Virtuals
Virtuals only show when explictly called. They will not show when calling the doc as a whole.
