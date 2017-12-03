$(document).ready(function() {
  console.log('hello world');

  var countyList  = ['Avon', 'Bedfordshire', 'Berkshire', 'Buckinghamshire', 'Cambridgeshire', 'Cheshire', 'Cleveland', 'Cornwall', 'Cumbria', 'Derbyshire', 'Devon', 'Dorset', 'Durham', 'East Sussex', 'Essex', 'Gloucestershire', 'Hampshire', 'Herefordshire', 'Hertfordshire', 'Isle of Wight', 'Kent', 'Lancashire', 'Leicestershire', 'Lincolnshire', 'Greater London', 'Merseyside', 'Middlesex', 'Norfolk', 'Northamptonshire', 'Northumberland', 'North Humberside', 'North Yorkshire', 'Nottinghamshire', 'Oxfordshire', 'Rutland', 'Shropshire', 'Somerset', 'South Humberside', 'South Yorkshire', 'Staffordshire', 'Suffolk', 'Surrey', 'Tyne and Wear', 'Warwickshire', 'West Midlands', 'West Sussex', 'West Yorkshire', 'Wiltshire', 'Worcestershire', 'Clwyd', 'Dyfed', 'Gwent', 'Gwynedd', 'Mid Glamorgan', 'Powys', 'South Glamorgan', 'West Glamorgan', 'Aberdeenshire', 'Angus', 'Argyll', 'Ayrshire', 'Banffshire', 'Berwickshire', 'Bute', 'Caithness', 'Clackmannanshire', 'Dumfriesshire', 'Dunbartonshire', 'East Lothian', 'Fife', 'Inverness-shire', 'Kincardineshire', 'Kinross-shire', 'Kirkcudbrightshire', 'Lanarkshire', 'Midlothian', 'Moray', 'Nairnshire', 'Orkney', 'Peeblesshire', 'Perthshire', 'Renfrewshire', 'Ross-shire', 'Roxburghshire', 'Selkirkshire', 'Shetland', 'Stirlingshire', 'Sutherland', 'West Lothian', 'Wigtownshire', 'Antrim', 'Armagh', 'Down', 'Fermanagh', 'Londonderry', 'Tyrone'];
  var countryList = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas' , 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'BurkinaFaso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D\' Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana' ,'Gibraltar','Greece','Greenland','Grenada','Guam','Guatemala','Guernsey','Guinea','Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait','Kyrgyz Republic', 'Laos', 'Latvia' ,'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania' , 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'];

  $('#addressForm').submit(function(event) {
    event.preventDefault();
    console.log('Form submitted');

    if(!$('#extraFieldsContainer').is(':visible')) {
      hideErrorMessage();
      getAddressDetails();
    } else {
      alert('FINAL STEP!');
    }
  });

  function getAddressDetails() {
    var postcode  = $('#postcodeInput').val();
    var apiKey    = 'nSJeNojaQE-dX4tiiRtfzg11341'; // Not safe to store key here on live environments
    var apiUrl    = 'https://api.getAddress.io/find/'+ postcode +'?api-key='+ apiKey;

    $.ajax({
      type: 'GET',
      url: apiUrl,
      data: postcode,
      success: function(data) {
        console.log('Success!');
        console.log(data);
        var addresses = data.addresses;
        generateAddressDropdown(addresses);
      },
      error: function(data) {
        console.log('Error!');
        console.log(data);
        displayErrorMessage();
      }
    });
  }

  function displayErrorMessage() {
    $('#errorMessage').fadeIn(200, function() {
      console.log('Error message is visible');
    });
  }

  function hideErrorMessage() {
    $('#errorMessage').fadeOut(100, function() {
      console.log('Error message is invisible');
    });
  }

  function generateAddressDropdown(addressList) {
    $('#errorMessage').before(
      $('<fieldset id="addressFieldset" class="form-section__fieldset form-section__fieldset--hidden"><legend class="form-section__legend">Select your address:</legend><select required id="addressInput" class="form-section__select form-section__select--right form-section__select--wide"><option value="" disabled selected class="form-section__option form-section__option--default">Select your address</option></select></fieldset>')
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
      console.log('select has changed!');
      console.log(this.value);
      var addressValue      = this.value;
      var addressArray      = addressValue.split(',');
      var addressLineOne    = addressArray[0];
      var addressLineTwo    = addressArray[1];
      var addressLineThree  = addressArray[2];
      var addressTown       = addressArray[5];
      var addressCounty     = addressArray[6].slice(1);
      var addressCountry    = 'United Kingdom';

      console.log(addressCounty)

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
        console.log('Extra fields now visible!');
        toggleUkCounties();
      });
    });
  }

  function toggleUkCounties() {
    $('#countryInput').on('change', function() {
      if(this.value === 'United Kingdom') {
        $('#countyInput').attr('disabled', false);
        $('#countyInput').removeClass('form-section__select--hidden');
      } else {
        $('#countyInput').attr('disabled', true);
        $('#countyInput').addClass('form-section__select--hidden');
      }
    });
  }

});
