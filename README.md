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

Remove:{
  good: RESULT > { acknowledged: true, deletedCount: 57 }  ::DELETED WHOLE DB::
  bad (doc does not exist): RESULT > { acknowledged: true, deletedCount: 0 }
}



Update

Find:{
  good: ::FOUND ENTIRE DATABASE::

}

Insert:{
  good: RESULT > [
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

  bad (doc already exists): ::NO RESPONSE::
}

