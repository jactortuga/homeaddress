$(document).ready(function() {
  console.log('Hello Octopus!');

  var countyList  = ['Avon', 'Bedfordshire', 'Berkshire', 'Buckinghamshire', 'Cambridgeshire', 'Cheshire', 'Cleveland', 'Cornwall', 'Cumbria', 'Derbyshire', 'Devon', 'Dorset', 'Durham', 'East Sussex', 'Essex', 'Gloucestershire', 'Hampshire', 'Herefordshire', 'Hertfordshire', 'Isle of Wight', 'Kent', 'Lancashire', 'Leicestershire', 'Lincolnshire', 'Greater London', 'Merseyside', 'Middlesex', 'Norfolk', 'Northamptonshire', 'Northumberland', 'North Humberside', 'North Yorkshire', 'Nottinghamshire', 'Oxfordshire', 'Rutland', 'Shropshire', 'Somerset', 'South Humberside', 'South Yorkshire', 'Staffordshire', 'Suffolk', 'Surrey', 'Tyne and Wear', 'Warwickshire', 'West Midlands', 'West Sussex', 'West Yorkshire', 'Wiltshire', 'Worcestershire', 'Clwyd', 'Dyfed', 'Gwent', 'Gwynedd', 'Mid Glamorgan', 'Powys', 'South Glamorgan', 'West Glamorgan', 'Aberdeenshire', 'Angus', 'Argyll', 'Ayrshire', 'Banffshire', 'Berwickshire', 'Bute', 'Caithness', 'Clackmannanshire', 'Dumfriesshire', 'Dunbartonshire', 'East Lothian', 'Fife', 'Inverness-shire', 'Kincardineshire', 'Kinross-shire', 'Kirkcudbrightshire', 'Lanarkshire', 'Midlothian', 'Moray', 'Nairnshire', 'Orkney', 'Peeblesshire', 'Perthshire', 'Renfrewshire', 'Ross-shire', 'Roxburghshire', 'Selkirkshire', 'Shetland', 'Stirlingshire', 'Sutherland', 'West Lothian', 'Wigtownshire', 'Antrim', 'Armagh', 'Down', 'Fermanagh', 'Londonderry', 'Tyrone'];
  var countryList = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas' , 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'BurkinaFaso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D\' Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana' ,'Gibraltar','Greece','Greenland','Grenada','Guam','Guatemala','Guernsey','Guinea','Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait','Kyrgyz Republic', 'Laos', 'Latvia' ,'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania' , 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'];

  $('#addressForm').submit(function(event) {
    event.preventDefault();

    if(!$('#extraFieldsContainer').is(':visible')) {
      hideErrorMessage();
      getAddressDetails();
    } else {
      getFullAddress();
    }
  });

  function getAddressDetails() {
    $('#formContainer').addClass('form-section--opaque');
    var postcode  = $('#postcodeInput').val();
    var apiKey    = 'ejhha1uRIEeRN9Lu9JloqQ11342'; // Not safe to store key here on live environments
    var apiUrl    = 'https://api.getAddress.io/find/'+ postcode +'?api-key='+ apiKey;

    $.ajax({
      type: 'GET',
      url: apiUrl,
      data: postcode,
      success: function(data) {
        console.log('Success!');
        console.log(data);
        var addresses = data.addresses;
        $('#formContainer').removeClass('form-section--opaque');
        $('#postcodeInput').attr('disabled', true);
        $('#postcodeInput').addClass('form-fieldset__input--disabled');
        generateAddressDropdown(addresses);
      },
      error: function(data) {
        console.log('Error!');
        console.log(data);
        $('#formContainer').removeClass('form-section--opaque');
        displayErrorMessage();
      }
    });
  }

  function displayErrorMessage() {
    $('#errorMessage').fadeIn(200);
  }

  function hideErrorMessage() {
    $('#errorMessage').fadeOut(200);
  }

  function generateAddressDropdown(addressList) {
    $('#errorMessage').before(
      $('<fieldset id="addressFieldset" class="form-fieldset form-fieldset--hidden"><legend class="form-fieldset__legend">Select your address:</legend><select required id="addressInput" class="form-fieldset__select form-fieldset__select--left form-fieldset__select--wide"><option value="" disabled selected hidden>Select your address</option></select></fieldset>')
    );

    for (var i = 0; i < addressList.length; i++){
      $('<option/>').val(addressList[i]).html(addressList[i]).appendTo('#addressFieldset select');
    }

    $('#addressFieldset').fadeIn(200, function() {
      populateAddressFields();
    });
  }

  function populateAddressFields() {
    $('#addressInput').on('change', function() {
      var addressValue      = this.value;
      var addressArray      = addressValue.split(',');
      var addressLineOne    = addressArray[0];
      var addressLineTwo    = addressArray[1];
      var addressLineThree  = addressArray[2];
      var addressTown       = addressArray[5];
      var addressCounty     = addressArray[6].slice(1);
      var addressCountry    = 'United Kingdom';

      for (var i = 0; i < countyList.length; i++){
        $('<option/>').val(countyList[i]).html(countyList[i]).appendTo('#countyInput');
      }

      for (var j = 0; j < countryList.length; j++){
        $('<option/>').val(countryList[j]).html(countryList[j]).appendTo('#countryInput');
      }

      $('#lineOneInput').val(addressLineOne);
      $('#lineTwoInput').val(addressLineTwo);
      $('#lineThreeInput').val(addressLineThree);
      $('#townInput').val(addressTown);
      $('#countyInput').val(addressCounty);
      $('#countryInput').val(addressCountry);

      $('#extraFieldsContainer').fadeIn(200, function() {
        $(this).css('display','flex');
        toggleUkCounties();
      });
    });
  }

  function toggleUkCounties() {
    $('#countryInput').on('change', function() {
      if(this.value === 'United Kingdom') {
        $('#countyInput').attr('disabled', false);
        $('#countyInput').removeClass('form-fieldset__select--hidden');
      } else {
        $('#countyInput').attr('disabled', true);
        $('#countyInput').addClass('form-fieldset__select--hidden');
      }
    });
  }

  function getFullAddress() {
    var addressLineOne    = $('#lineOneInput').val() ? $('#lineOneInput').val() + ', ' : '';
    var addressLineTwo    = $('#lineTwoInput').val() ? $('#lineTwoInput').val() + ', ' : '';
    var addressLineThree  = $('#lineThreeInput').val() ? $('#lineThreeInput').val() + ', ' : '';
    var addressTown       = $('#townInput').val() ? $('#townInput').val() + ', ' : '';
    var addressCounty     = $('#countryInput').val() === 'United Kingdom' ? $('#countyInput').val() + ', ' : '';
    var addressCountry    = $('#countryInput').val() + '.';
    var yearsAtAddress    = $('#yearsInput').val();
    var monthsAtAddress   = $('#monthsInput').val();
    var fullAddress       = addressLineOne + addressLineTwo + addressLineThree + addressTown + addressCounty + addressCountry;
    var timeAtAddress     = 'Time at the address: ' + yearsAtAddress + ', ' + monthsAtAddress;

    addAddressBox(fullAddress, timeAtAddress);
  }


  function addAddressBox(address, time) {
    $('<div class="form-section__inner form-section__inner--half form-section__inner--opaque"><p>'+ address +'</p><p>'+ time +'</p></div>').appendTo('#addressBoxesContainer');

    $('#extraFieldsContainer').fadeOut(200, function() {
      cleanAddressFields();
      if(!$('#addressBoxesContainer').is(':visible')) {
        $('#addressBoxesContainer').fadeIn(200, function() {
          $(this).css('display','flex');
        });
      }
    });
  }

  function cleanAddressFields() {
    $('#yearsInput').val('');
    $('#monthsInput').val('');
    $('#addressInput').val('');
    $('#postcodeInput').val('');
    $('#postcodeInput').attr('disabled', false);
    $('#postcodeInput').removeClass('form-fieldset__input--disabled');
    $('#addressFieldset').remove();
  }
});
