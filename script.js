// For Table Filter - Page 3
var $filterCheckboxes = $('input[type="checkbox"]');

  // Read All Available Filter Groups
  var allFilters = [];
  $filterCheckboxes.each(function() {
  	if ($.inArray(this.name,allFilters) == -1){
    	allFilters.push(this.name);
    }  
  });
//  console.log(allFilters); 


$filterCheckboxes.on('change', function() {

  // create a collection containing all of the filterable elements
  var $filteredResults = $('.item');

	var $filterCategoryApplied = 0;
  /*
  $.each(allFilters, function(arIndex, filterName) {
  // console.log(filterName); 
	var $filterCheckboxCategory = $('input[name='+filterName+']').filter(':checked');
	
  console.log(filterName + ' length = ' + $filterCheckboxCategory.length);
   
   if ( $filterCheckboxCategory.length === 0 ) {
//    alert('none checked for ' + filterName);
    $filteredResults = [];
   }
  });


console.log('start checking');*/


	// Read Selectetd Filters
  var selectedFilters = {};
  $filterCheckboxes.filter(':checked').each(function() {
    if (!selectedFilters.hasOwnProperty(this.name)) {
      selectedFilters[this.name] = [];
    }
    selectedFilters[this.name].push(this.value);
  });
  
  
  // loop over the selected filter name -> (array) values pairs
  $.each(selectedFilters, function(name, filterValues) {

//console.log(selectedFilters['fl-colour'].length); 
//console.log(name); 
//console.log(filterValues); 
//console.log(filterValues.length); 


    // filter each .flower element
    $filteredResults = $filteredResults.filter(function() {

      var matched = false
      var currentFilterValues = $(this).data('category')?.split(' ');
      console.log(currentFilterValues)

      // loop over each category value in the current .flower's data-category
      $.each(currentFilterValues, function(_, currentFilterValue) {

        // if the current category exists in the selected filters array
        // set matched to true, and stop looping. as we're ORing in each
        // set of filters, we only need to match once

        if ($.inArray(currentFilterValue, filterValues) != -1) {
          matched = true;
          return false;
        }
      });

      // if matched is true the current .flower element is returned
      return matched;

    });
  });

  $('.item').hide().filter($filteredResults).show();

});