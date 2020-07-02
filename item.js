const ItemCtrl = (function(){
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  }
  return{
    getItems: function(){
      return data.items;
    },
    addItem: function(name, calories){
      let id;
      //Create Id
      if(data.items.length > 0){
        id = data.items[data.items.length - 1].id +1;
      }else{
        id = 0;
      }
      const inputCalories = parseInt(calories);
      

      newItem = new Item(id, name, inputCalories);
      data.items.push(newItem);
      return newItem;
    },
    getItemById: function(id){
      let found = null;

      //loop through the items
      data.items.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });
      return found;
    },
    updateItem: function(name, calories){
      //Calories to number
      calories = parseInt(calories);
      let found = null;
      
      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(id){

      const ids = data.items.map(function(item){
        return item.id;
      });
      const index = ids.indexOf(id);
      data.items.splice(index, 1);
      data.currentItem = null;
    },
    clearAllItems: function(){
      data.items = [];
    },
    setCurrentItem: function(item){
      data.currentItem = item;
    },
    getCurrentItem: function(){
      return data.currentItem;
    },
    getTotalCalories: function(){
      let total = 0;
      data.items.forEach(function(item){
        total += item.calories;
      });
      //Set total Calories
      data.totalCalories = total;
      return data.totalCalories;
    },
    logData: function(){
      return data;
    }
  }
})();