//Storage Controller
const StorageCtrl = (function(){
  return{
    storeItem: function(item){
      let items;
      if(localStorage.getItem('items') === null){
        items = [];
        items.push(item);
        //set LocalStorage
        localStorage.setItem('items', JSON.stringify(items));
      }else{
        items = JSON.parse(localStorage.getItem('items'));
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function(){
      let items;
      if(localStorage.getItem('items') === null){
        items = [];
      }else{
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: function(updatedItem){
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index){
        if(updatedItem.id === item.id){
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items)); 
      
    },
    deleteFromLocalStorage: function(currentItemId){
      
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index){
        if(currentItemId === item.id){
          items.splice(index, 1);
          console.log(items);
        }
      });
      localStorage.setItem('items', JSON.stringify(items)); 
    },
    clearItemsFromStorage: function(){
      localStorage.removeItem('items');
    }
  }
})();