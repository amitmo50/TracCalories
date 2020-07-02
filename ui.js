const UICtrl = (function(){
  const UISelector = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCaloriesInput: '.total-calories',
    clearBtn:'.clear-btn'
  }
  return{
    populateItemList: function(items){
      let html = '';
      items.forEach(function(item){
        html += `<li id="item-${item.id}" class="collection-item">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a hrf="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>`;
      });

      //Insert List Items
      document.querySelector(UISelector.itemList).innerHTML = html;
    },
    getItemInput: function(){
      return {
        name: document.querySelector(UISelector.itemNameInput).value,
        calories: document.querySelector(UISelector.itemCaloriesInput).value
      }
    },
    addListItem: function(item){
      // show the list
      document.querySelector(UISelector.itemList).style.display = 'block';

      //Create li element
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      //add HTML
      li.innerHTML = `
      <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a hrf="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      //insert item
      document.querySelector(UISelector.itemList).insertAdjacentElement('beforeend', li)
    },
    updateListItem: function(item){
      let listItems = document.querySelectorAll(UISelector.listItems);
      listItems = Array.from(listItems);
      listItems.forEach(function(listItem){
      const itemId = listItem.getAttribute('id');
      if(itemId === `item-${item.id}`){
        document.querySelector(`#${itemId}`).innerHTML = `
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a hrf="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
      }
      });
    },
    deleteListItem: function(id){

      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
     

    },
    clearInput: function(){
      document.querySelector(UISelector.itemNameInput).value = '';
      document.querySelector(UISelector.itemCaloriesInput).value = '';
    },
    hideList: function(){
      document.querySelector(UISelector.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories){
      document.querySelector(UISelector.totalCaloriesInput).innerHTML = totalCalories;
    },
    clearEditState: function(){
      UICtrl.clearInput();
      document.querySelector(UISelector.updateBtn).style.display = 'none';
      document.querySelector(UISelector.deleteBtn).style.display = 'none';
      document.querySelector(UISelector.backBtn).style.display = 'none';
      document.querySelector(UISelector.addBtn).style.display = 'inline';
    },
    showEditState: function(){
      document.querySelector(UISelector.updateBtn).style.display = 'inline';
      document.querySelector(UISelector.deleteBtn).style.display = 'inline';
      document.querySelector(UISelector.backBtn).style.display = 'inline';
      document.querySelector(UISelector.addBtn).style.display = 'none';
    },
    addItemToForm: function(){
      document.querySelector(UISelector.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelector.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();

    },
    removeItems: function(){
      let listItems = document.querySelectorAll(UISelector.listItems);

      listItems = Array.from(listItems);
      listItems.forEach(function(item){
        item.remove();
      });
    },
    getSelectors: function(){
      return UISelector;
    }
  }
})();