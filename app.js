
//App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
  // Load EventListeners
  const loadEventListeners = function(){
    const UISelectors = UICtrl.getSelectors();

    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    //disable Submit Add
    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.which === 13){
        e.preventDefault();
        return false;
      }
    });
    //Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    //Update click
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    //Delete click
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemClick);
  }
  //Add item submit
  const itemAddSubmit = function(e){
    // Get form input from UI controler
    const input = UICtrl.getItemInput();
    if(input.name !== '' && input.calories !== ''){
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addListItem(newItem);

      // Get total Calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total Calories to UI
      UICtrl.showTotalCalories(totalCalories);
      // Store in LocalStorage
      StorageCtrl.storeItem(newItem);
      //Clear fields
      UICtrl.clearInput();
    }
    e.preventDefault();
  }

  //Click Edit Item
  const itemEditClick = function(e){
    if(e.target.classList.contains('edit-item')){
      // Get list item ID
      const listid = e.target.parentNode.parentNode.id;
      
      //Break into an Array
      const listIdArr = listid.split('-');

      const id = parseInt(listIdArr[1]);

      const itemToEdit = ItemCtrl.getItemById(id);
      
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
      
    }
    e.preventDefault();
  }

  const itemUpdateSubmit = function(e){

    const input = UICtrl.getItemInput();
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    UICtrl.updateListItem(updatedItem);
    // Get total Calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total Calories to UI
    UICtrl.showTotalCalories(totalCalories);
    StorageCtrl.updateItemStorage(updatedItem);
    //Clear fields
    UICtrl.clearEditState();
    UICtrl.clearInput();
      
    e.preventDefault();
  }

  const itemDeleteSubmit = function(e){
    const currentItem = ItemCtrl.getCurrentItem();
    ItemCtrl.deleteItem(currentItem.id);
    UICtrl.deleteListItem(currentItem.id);

    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total Calories to UI
    UICtrl.showTotalCalories(totalCalories);
    StorageCtrl.deleteFromLocalStorage(currentItem.id);
    //Clear fields
    UICtrl.clearEditState();
    UICtrl.clearInput();
    e.preventDefault();
  }

  const clearAllItemClick = function(e){
    ItemCtrl.clearAllItems();
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total Calories to UI
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.removeItems();
    StorageCtrl.clearItemsFromStorage();
    UICtrl.hideList();
    e.preventDefault();
  }

  return{
    init: function(){
      console.log('Initializing App...');
      UICtrl.clearEditState();
      const items = ItemCtrl.getItems();
      // Check if any items
      if(items.length === 0){
        UICtrl.hideList();
      }else{
        UICtrl.populateItemList(items);
      }
      
      // Get total Calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total Calories to UI
      UICtrl.showTotalCalories(totalCalories);

      loadEventListeners();
    }
  }

})(ItemCtrl, StorageCtrl, UICtrl);

App.init();
