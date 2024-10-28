// On document Ready...
jQuery(function ($) {
    if (typeof (Accumulus) === 'undefined') window.Accumulus = {};

    var A = {};

    A.global = {};
    A.global.language = null;
    A.global.defaultLanguage = 'en-US';
    A.global.localize = true;
    A.global.currencyCode = null;
    A.global.currencyFormat = 'en-US';
    A.global.defaultCountryCode = 'USA';
    A.global.vatOnEServicesCountries = {
        'AUT': 'VOE',
        'BEL': 'VOE',
        'BGR': 'VOE',
        'CYP': 'VOE',
        'CZE': 'VOE',
        'DEU': 'VOE',
        'DNK': 'VOE',
        'ESP': 'VOE',
        'EST': 'VOE',
        'FIN': 'VOE',
        'FRA': 'VOE',
        'GBP': 'VOE',
        'GRC': 'VOE',
        'HRV': 'VOE',
        'HUN': 'VOE',
        'IRL': 'VOE',
        'ITA': 'VOE',
        'LTU': 'VOE',
        'LUX': 'VOE',
        'LVA': 'VOE',
        'MLT': 'VOE',
        'NLD': 'VOE',
        'POL': 'VOE',
        'PRT': 'VOE',
        'ROU': 'VOE',
        'SVK': 'VOE',
        'SVN': 'VOE',
        'SWE': 'VOE'
    };

    A.serviceUrl = 'https://testajax.accumulus.com/webapi';
    A.resourcesUrl = '';
    A.log = { info: true, info2: false, error: true };
    A.formatAsYouWrite = false;
    A.showLoadingOverlay = true;

    if (Accumulus.resourcesUrl) {
        A.resourcesUrl = Accumulus.resourcesUrl;
    }

    if (Accumulus.showLoadingOverlay) {
        A.showLoadingOverlay = Accumulus.showLoadingOverlay;
    }

    A.languageFilesUrl = A.resourcesUrl + 'js/lang/';

    A.images = {
        AMEX: A.resourcesUrl + 'images/card_amex.png',
        CART: A.resourcesUrl + 'images/card_carte_blanche.png',
        DINE: A.resourcesUrl + 'images/card_diners.png',
        DISC: A.resourcesUrl + 'images/card_discover.png',
        JCB: A.resourcesUrl + 'images/card_jcb.png',
        MC: A.resourcesUrl + 'images/card_mastercard.png',
        VISA: A.resourcesUrl + 'images/card_visa.png',

        CVV: A.resourcesUrl + 'images/csc.png',
        BA: A.resourcesUrl + 'images/check_tmb.png',
        PP: A.resourcesUrl + 'images/paypal-logo.svg',
        DEFAULT: null
    };

    A.currencySymbols = {
        'AFN': '؋',
        'ALL': 'Lek',
        'ANG': 'ƒ',
        'ARS': '$',
        'AUD': 'A$',
        'AWG': 'ƒ',
        'AZN': 'ман',
        'BAM': 'KM',
        'BBD': '$',
        'BGN': 'лв',
        'BMD': '$',
        'BND': '$',
        'BOB': '$b',
        'BRL': 'R$',
        'BSD': '$',
        'BWP': 'P',
        'BYR': 'p.',
        'BZD': 'BZ$',
        'CAD': 'C$',
        'CHF': 'CHF',
        'CLP': '$',
        'CNY': '¥',
        'COP': '$',
        'CRC': '₡',
        'CUP': '₱',
        'CZK': 'Kč',
        'DKK': 'kr',
        'DOP': 'RD$',
        'EGP': '£',
        'EUR': '€',
        'FJD': '$',
        'FKP': '£',
        'GBP': '£',
        'GGP': '£',
        'GHS': '¢',
        'GIP': '£',
        'GTQ': 'Q',
        'GYD': '$',
        'HKD': '$',
        'HNL': 'L',
        'HRK': 'kn',
        'HUF': 'Ft',
        'IDR': 'Rp',
        'ILS': '₪',
        'IMP': '£',
        'INR': 'INR',
        'IRR': '﷼',
        'ISK': 'kr',
        'JEP': '£',
        'JMD': 'J$',
        'JPY': '¥',
        'KGS': 'лв',
        'KHR': '៛',
        'KPW': '₩',
        'KRW': '₩',
        'KYD': '$',
        'KZT': 'лв',
        'LAK': '₭',
        'LBP': '£',
        'LKR': '₨',
        'LRD': '$',
        'MKD': 'ден',
        'MNT': '₮',
        'MUR': '₨',
        'MXN': '$',
        'MYR': 'RM',
        'MZN': 'MT',
        'NAD': '$',
        'NGN': '₦',
        'NIO': 'C$',
        'NOK': 'kr',
        'NPR': '₨',
        'NZD': '$',
        'OMR': '﷼',
        'PAB': 'B/.',
        'PEN': 'S/.',
        'PHP': '₱',
        'PKR': '₨',
        'PLN': 'zł',
        'PYG': 'Gs',
        'QAR': '﷼',
        'RON': 'lei',
        'RSD': 'Дин.',
        'RUB': 'руб',
        'SAR': '﷼',
        'SBD': '$',
        'SCR': '₨',
        'SEK': 'kr',
        'SGD': '$',
        'SHP': '£',
        'SOS': 'S',
        'SRD': '$',
        'SVC': '$',
        'SYP': '£',
        'THB': '฿',
        'TRY': 'TRY',
        'TTD': 'TT$',
        'TVD': '$',
        'TWD': 'NT$',
        'UAH': '₴',
        'USD': '$',
        'UYU': '$U',
        'UZS': 'лв',
        'VEF': 'Bs',
        'VND': '₫',
        'XCD': '$',
        'YER': '﷼',
        'ZAR': 'R',
        'ZWD': 'Z$'
    };

    $.extend(A, {
        plugins: {
            balance: {
                markup: {
                    name: 'balance',
                    selector: '.acc-balance',
                    options: []
                }
            },
            profile: {
                markup: {
                    name: 'profile',
                    selector: '.acc-profile',
                    options: [
                        new AccMarkupOption('lockEmail', 'lockEmail', AccBoolean),
                        new AccMarkupOption('onCustomerEdit', 'customerEdit', AccHandler),
                        new AccMarkupOption('onPasswordChange', 'passwordChange', AccHandler),
                        new AccMarkupOption('showChangePassword', 'showChangePassword', AccBoolean),
                        new AccMarkupOption('taxInformationCountries', 'taxInformationCountries', AccAttribute),
                        new AccMarkupOption('vatOnEServices', 'vatOnEServices', AccBoolean)
                    ]
                }
            },
            paymentMethods: {
                markup: {
                    name: 'paymentMethods',
                    selector: '.acc-payment-methods',
                    options: [
                        new AccMarkupOption('showBillingAddress', 'showBillingAddress', AccBoolean),
                        new AccMarkupOption('showCreditCards', 'showCreditCards', AccBoolean),
                        new AccMarkupOption('showBankAccounts', 'showBankAccounts', AccBoolean),
                        new AccMarkupOption('showBillingAgreements', 'showBillingAgreements', AccBoolean),
                        new AccMarkupOption('confirmUrl', 'confirmUrl', AccAttribute),
                        new AccMarkupOption('cancelUrl', 'cancelUrl', AccAttribute)
                    ]
                }
            },
            subscriptionList: {
                markup: {
                    name: 'subscriptionList',
                    selector: '.acc-subscription-list',
                    options: [
                        new AccMarkupOption('cancelSubscription', 'cancelSubscription', AccBoolean),
                        new AccMarkupOption('itemFieldsHandler', 'itemFieldsHandler', AccHandler)
                    ]
                }
            },
            statementHistory: {
                markup: {
                    name: 'statementHistory',
                    selector: '.acc-statement-history',
                    options: []
                }
            },
            usageBalances: {
                markup: {
                    name: 'usageBalances',
                    selector: '.acc-usage-balances',
                    options: [new AccMarkupOption('formatQuantityHandler', 'formatQuantityHandler', AccHandler)]
                }
            },
            usageHistory: {
                markup: {
                    name: 'usageHistory',
                    selector: '.acc-usage-history',
                    options: [
                        new AccMarkupOption('skip', 'skip', AccAttribute),
                        new AccMarkupOption('take', 'take', AccAttribute),
                        new AccMarkupOption('fromDateTime', 'fromDateTime', AccAttribute)
                    ]
                }
            },
            makePayment: {
                markup: {
                    name: 'makePayment',
                    selector: '.acc-make-payment',
                    options: [new AccMarkupOption('onPaymentMade', 'paymentMade', AccHandler)]
                }
            },
            signup: {
                markup: {
                    name: 'signup',
                    selector: '.acc-signup',
                    options: [
                        new AccMarkupOption('creditCardTypes', 'creditCardTypes', AccAttribute),
                        new AccMarkupOption('lockEmail', 'lockEmail', AccBoolean),
                        new AccMarkupOption('allowEmptyBankAccountInfo', 'allowEmptyBankAccountInfo', AccBoolean),
                        new AccMarkupOption('showHeader', 'showHeader', AccBoolean),
                        new AccMarkupOption('offerCode', 'offerCode', AccAttribute),
                        new AccMarkupOption('currencyCode', 'currencyCode', AccAttribute),
                        new AccMarkupOption('customer', 'customer', AccJson),
                        new AccMarkupOption('subscription', 'subscription', AccJson),
                        new AccMarkupOption('showPrice', 'showPrice', AccBoolean),
                        new AccMarkupOption('showPromotion', 'showPromotion', AccBoolean),
                        new AccMarkupOption('showCreditCard', 'showCreditCard', AccBoolean),
                        new AccMarkupOption('showBankAccount', 'showBankAccount', AccBoolean),
                        new AccMarkupOption('showBillingAgreement', 'showBillingAgreement', AccBoolean),
                        new AccMarkupOption('defaultPaymentMethod', 'defaultPaymentMethod', AccAttribute),
                        new AccMarkupOption('confirmUrl', 'confirmUrl', AccAttribute),
                        new AccMarkupOption('cancelUrl', 'cancelUrl', AccAttribute),
                        new AccMarkupOption('collectCustomer', 'collectCustomer', AccBoolean),
                        new AccMarkupOption('showCustomerAddress', 'showCustomerAddress', AccBoolean),
                        new AccMarkupOption('showCustomerPhone', 'showCustomerPhone', AccBoolean),
                        new AccMarkupOption('requireCustomerPhone', 'requireCustomerPhone', AccBoolean),
                        new AccMarkupOption('collectPassword', 'collectPassword', AccBoolean),
                        new AccMarkupOption('showSSLBanner', 'showSSLBanner', AccBoolean),
                        new AccMarkupOption('showAccountBanner', 'showAccountBanner', AccBoolean),
                        new AccMarkupOption('showTCCheckbox', 'showTCCheckbox', AccBoolean),
                        new AccMarkupOption('showBillingAddress', 'showBillingAddress', AccBoolean),
                        new AccMarkupOption('vestaTokenService', 'vestaTokenService', AccJson),
                        new AccMarkupOption('descriptionHTML', 'descriptionHTML', AccAttribute),
                        new AccMarkupOption('completionHTML', 'completionHTML', AccAttribute),
                        new AccMarkupOption('termsAndConditionsHTML', 'termsAndConditionsHTML', AccAttribute),
                        new AccMarkupOption('onSignup', 'signup', AccHandler),
                        new AccMarkupOption('onCalculateSignupFees', 'calculateSignupFees', AccHandler),
                        new AccMarkupOption('onValidatePromotion', 'validatePromotion', AccHandler),
                        new AccMarkupOption('vatOnEServices', 'vatOnEServices', AccBoolean),
                        new AccMarkupOption('taxInformationCountries', 'taxInformationCountries', AccAttribute)
                    ]
                }
            },
            portal: {
                markup: {
                    name: 'portal',
                    selector: '.acc-portal',
                    options: [
                        new AccMarkupOption('customerID', 'customerID', AccAttribute),
                        new AccMarkupOption('showHeader', 'showHeader', AccBoolean),
                        new AccMarkupOption('headerText', 'headerText', AccAttribute),
                        new AccMarkupOption('loginScreen', 'loginScreen', AccBoolean),
                        new AccMarkupOption('showWidgetHeaders', 'showWidgetHeaders', AccBoolean),
                        new AccMarkupOption('emptyWidgetAreaUrl', 'emptyWidgetAreaUrl', AccAttribute),
                        new AccMarkupOption('companyLogoUrl', 'companyLogoUrl', AccAttribute),
                        new AccMarkupOption('showProfile', 'showProfile', AccBoolean),
                        new AccMarkupOption('showSubscriptionList', 'showSubscriptionList', AccBoolean),
                        new AccMarkupOption('showStatementHistory', 'showStatementHistory', AccBoolean),
                        new AccMarkupOption('showBalance', 'showBalance', AccBoolean),
                        new AccMarkupOption('showUsageHistory', 'showUsageHistory', AccBoolean),
                        new AccMarkupOption('showUsageBalances', 'showUsageBalances', AccBoolean),
                        new AccMarkupOption('showPaymentMethods', 'showPaymentMethods', AccBoolean),
                        new AccMarkupOption('showMakePayment', 'showMakePayment', AccBoolean),
                        new AccMarkupOption('forcePasswordChange', 'forcePasswordChange', AccBoolean),

                        new AccMarkupOption('profile_onCustomerEdit', 'profile_onCustomerEdit', AccHandler),
                        new AccMarkupOption('profile_onPasswordChange', 'profile_onPasswordChange', AccHandler),
                        new AccMarkupOption('profile_showChangePassword', 'profile_showChangePassword', AccBoolean),
                        new AccMarkupOption('profile_taxInformationCountries', 'profile_taxInformationCountries', AccAttribute),
                        new AccMarkupOption('profile_vatOnEServices', 'profile_vatOnEServices', AccBoolean),

                        new AccMarkupOption('subscriptionList_cancelSubscription', 'subscriptionList_cancelSubscription', AccBoolean),
                        new AccMarkupOption('subscriptionList_itemFieldsHandler', 'subscriptionList_itemFieldsHandler', AccHandler),

                        new AccMarkupOption('usageHistory_skip', 'usageHistory_skip', AccAttribute),
                        new AccMarkupOption('usageHistory_take', 'usageHistory_take', AccAttribute),
                        new AccMarkupOption('usageHistory_fromDateTime', 'usageHistory_fromDateTime', AccAttribute),

                        new AccMarkupOption('usageBalances_formatQuantityHandler', 'usageBalances_formatQuantityHandler', AccHandler),

                        new AccMarkupOption('paymentMethods_showCreditCards', 'paymentMethods_showCreditCards', AccBoolean),
                        new AccMarkupOption('paymentMethods_showBankAccounts', 'paymentMethods_showBankAccounts', AccBoolean),
                        new AccMarkupOption('paymentMethods_showBillingAgreements', 'paymentMethods_showBillingAgreements', AccBoolean),
                        new AccMarkupOption('paymentMethods_showBillingAddress', 'paymentMethods_showBillingAddress', AccBoolean),
                        new AccMarkupOption('paymentMethods_confirmUrl', 'paymentMethods_confirmUrl', AccAttribute),
                        new AccMarkupOption('paymentMethods_cancelUrl', 'paymentMethods_cancelUrl', AccAttribute),

                        new AccMarkupOption('makePayment_onPaymentMade', 'makePayment_onPaymentMade', AccHandler)
                    ]
                }
            }
        },
        labels: {
            balance: {},
            profile: {},
            paymentMethods: {},
            subscriptionList: { productFieldCode: {} },
            statementHistory: {},
            usageBalances: { usageTypeCodes: {} },
            usageHistory: { typeCodes: {} },
            makePayment: {},
            portal: {},
            signup: {},
            general: {},
            error: { 'serverError': 'Server Error' }
        }
    });

    var accWidgetOptions = [
        new AccMarkupOption('tenantId', 'tenantID', AccAttribute),
        new AccMarkupOption('token', 'token', AccAttribute),
        new AccMarkupOption('requestID', 'requestID', AccAttribute),
        new AccMarkupOption('timestamp', 'timestamp', AccAttribute),
        new AccMarkupOption('messages', 'messages', AccJson),
        new AccMarkupOption('onServerError', 'serverErrorCallback', AccHandler)
    ];

    var portalPluginOptions = [
        new AccMarkupOption('showHeader', 'showHeader', AccBoolean),
        new AccMarkupOption('customerID', 'customerID', AccAttribute)
    ];

    A.plugins.balance.markup.options = A.plugins.balance.markup.options.concat(accWidgetOptions, portalPluginOptions);
    A.plugins.profile.markup.options = A.plugins.profile.markup.options.concat(accWidgetOptions, portalPluginOptions);
    A.plugins.paymentMethods.markup.options = A.plugins.paymentMethods.markup.options.concat(accWidgetOptions, portalPluginOptions);
    A.plugins.subscriptionList.markup.options = A.plugins.subscriptionList.markup.options.concat(accWidgetOptions, portalPluginOptions);
    A.plugins.statementHistory.markup.options = A.plugins.statementHistory.markup.options.concat(accWidgetOptions, portalPluginOptions);
    A.plugins.usageBalances.markup.options = A.plugins.usageBalances.markup.options.concat(accWidgetOptions, portalPluginOptions);
    A.plugins.usageHistory.markup.options = A.plugins.usageHistory.markup.options.concat(accWidgetOptions, portalPluginOptions);
    A.plugins.makePayment.markup.options = A.plugins.makePayment.markup.options.concat(accWidgetOptions, portalPluginOptions);
    A.plugins.portal.markup.options = A.plugins.portal.markup.options.concat(accWidgetOptions);
    A.plugins.signup.markup.options = A.plugins.signup.markup.options.concat(accWidgetOptions);

    A.isReady = false;

    A.constants = {
        UI: 'ui',
        MOBILE: 'mobile',
        CREDIT_CARD: "creditCard",
        BANK_ACCOUNT: "bankAccount",
        BILLING_AGREEMENT: "billingAgreement"
    };

    A.info = function (s) {
        if (Accumulus.log.info) { console.info(s); }
    };

    A.info2 = function (s) {
        if (Accumulus.log.info2) { console.info(s); }
    };

    A.error = function (s) {
        if (Accumulus.log.error) { console.error(s); }
    };

    /**
     * Replaces `${key}` by [args[key]] if [args] contains [key].
     * Example:
     *    // s = '1 ${b} 3'
     *    var s = format('${a} ${b} ${c}', { 'a': 1, 'c': 3 });
     */
    A.format = function (s, args) {
        return s.replace(/\$\{([^}]+)\}/g, function (m, p) {
            return (p in args) ? args[p] : m;
        });
    }

    /**
     * Formats the value or text content of [input] as a currency value using
     * the current currency format and code.
     */
    A.formatCurrency = function (input) {
        $(input).formatCurrency({
            region: Accumulus.global.currencyFormat,
            symbol: Accumulus.currencySymbols[Accumulus.global.currencyCode]
        });
    };

    A.initAccumulus = function () {
        var browserLang = navigator.language || navigator.userLanguage;
        _loadLangFile(browserLang, function (success) {
            if (success) {
                Accumulus.isReady = true;
                $(Accumulus).trigger('ready');
                _initAccumulusComponents();
            } else {
                _langFileError();
            }
        });
    };

    A.getErrorMsg = function (data) {
        try {
            var error = Accumulus.labels.error[data.Code];
            if (data.Code == '90000' && Accumulus.global.language.indexOf('en') == 0) {
                error = data.Message;
            }
            return error || Accumulus.labels.error['serverError'];
        } catch (e) {
            A.error(e);
            return data.Code;
        }
    };

    var _initAccumulusComponents = function () {
        Accumulus.info('Initiating accumulus markup components....');
        $.each(A.plugins, function (index, value) {
            var config = value.markup;
            var selector = config.selector;
            $.each($(selector), function (index, value) {
                var container = this;
                var properties = {};
                var options = config.options;
                $.each(options, function (index, o) {
                    var val = new o.type(container, o.markupPropertyName).getValue();
                    if (val !== null) properties[o.widgetPropertyName] = val;
                });
                $(container)[config.name](properties);
            });
        });
    };

    var _langFileError = function () {
        alert(Accumulus.getErrorMsg({ Code: 'serverError' }));
    };

    var _loadLangFile = function (lang, callback) {
        var defaultLang = Accumulus.global.defaultLanguage;

        if (Accumulus.global.localize && (lang != defaultLang)) {
            Accumulus.info('Attempting to load ' + lang + ' lang file...');
            _fetchLangFile(lang, function (success, data) {
                if (success) {
                    Accumulus.info('Language ' + lang + ' loaded, filling language object....');
                    $.extend(Accumulus.labels, data);
                    Accumulus.global.language = lang;
                    Accumulus.info('Language object filled.');
                    callback(true);
                } else {
                    Accumulus.info('Could not load ' + lang + ' language file, loading default language...');
                    _loadLangFile(defaultLang, callback);
                }
            });
        } else {
            Accumulus.info('Attempting to load ' + defaultLang + ' default lang file...');
            _fetchLangFile(defaultLang, function (success, data) {
                if (success) {
                    Accumulus.info('Language ' + defaultLang + ' loaded, filling language object....');
                    $.extend(Accumulus.labels, data);
                    Accumulus.global.language = defaultLang;
                    Accumulus.info('Language object filled.');
                    callback(true);
                } else {
                    Accumulus.error('Could not load ' + defaultLang + ' language file...');
                    callback(false);
                }
            });
        }
    };

    var _fetchLangFile = function (lang, callback) {
        var langUrl = Accumulus.languageFilesUrl + lang + ".json";
        $.ajax({
            type: 'GET',
            url: langUrl,
            dataType: 'json',
            success: function (data) {
                callback(true, data);

            },
            error: function (e) {
                callback(false, e);
            }
        });
    };

    /**
     * Translates labels to the language on the user's browser.
     * @param container on which the labels are going to be translated.
     * @param json formatted labels list to be used. You can select them from @see A.labels.
     */
    A.localize = function ($container, labels) {
        $container.find('[localize],[placeholder]').each(
            function (index) {
                var $this = $(this);
                var localize = $this.attr('localize') || $this.attr('placeholder');
                try {
                    var localized = labels[localize] || localize;
                    if (localized) {
                        if ($this.attr('placeholder')) {
                            $this.attr("placeholder", localized);
                        } else if ($this.is("input")) {
                            $this.val(localized);
                        } else {
                            $this.text(localized);
                        }
                    }
                } catch (e) {
                    Accumulus.error(e.message);
                }
            }
        );
    };

    /**
     * [defaultState] can be a state/province code (for US and Canada) or a
     * state/province name (for other countries).
     *
     * Depending on the selected country code, [$state] can be a select element
     * (for US and Canada) or a text input (for other countries) and show
     * tax information section if the country is in the tax information country list
     */
    A.hookUpStateAndCountry = function (widget, $stateSelect, defaultState,
        $countrySelect, defaultCountryCode) {

        function countrySelectChange() {
            var countryCode = this.value;

            if (widget.options.taxInformationCountries && countryCode in widget.options.taxInformationCountries) {
                widget.element.find('.acc-tax-information').show();
            } else {
                widget.element.find('.acc-tax-information').hide();
            }

            A.API.fetchStates(countryCode, function (success, response) {
                $stateSelect.empty();
                $stateSelect.append(new Option(Accumulus.labels.profile.selectState));
                if (success) {
                    var states = response.StatesAndProvinces;
                    for (var i in states) {
                        $stateSelect.append(
                            new Option(states[i].Name, states[i].StateProvinceCode));
                    }
                    if (countryCode == defaultCountryCode) {
                        $stateSelect.val(defaultState);
                    }
                } else {
                    widget._serverError(response);
                }
            });
        }

        $countrySelect.append(A.getAllCountries());
        $countrySelect.on("change", countrySelectChange);
        $countrySelect.val(defaultCountryCode || A.global.defaultCountryCode).trigger('change');
    };

    //****************************************************************************
    //************** General Accumulus API Functionality Object ******************
    //****************************************************************************
    A.API = {};
    A.API.jsonpCall = function (url, jsonData, callback) {
        //Accumulus.startLoading(); //TODO: review
        $.ajax({
            type: "POST",
            url: url,
            data: jsonData,
            dataType: "json",
            success: function (data) {
                //Accumulus.stopLoading(); //TODO: review
                callback(data.Code == 0, data);
            },
            error: function (data) {
                //Accumulus.stopLoading(); //TODO: review
                callback(false, data);
            }
        });
    }

    A.API.applyCurrencyFormat = function (input) {
        $(input).blur(function () {
            Accumulus.formatCurrency(this);
        });
        if (Accumulus.formatAsYouWrite) {
            $(input).keyup(function (e) {
                var e = window.event || e;
                var keyUnicode = e.charCode || e.keyCode;
                switch (keyUnicode) {
                    case 16: break; case 17: break; case 18: break;
                    case 27: break; case 35: break; case 36: break;
                    case 37: break; case 38: break; case 39: break;
                    case 40: break; case 78: break; case 110: break;
                    case 190: break;
                    default: $(this).formatCurrency({
                        region: Accumulus.global.currencyFormat,
                        roundToDecimalPlace: -1,
                        symbol: Accumulus.currencySymbols[Accumulus.global.currencyCode]
                    });
                }
            });
        }
    };

    A.API.fetchStates = function (countryCode, callback) {
        var url = A.serviceUrl + '/GetStatesAndProvinces';
        var data = { country: countryCode };
        A.API.jsonpCall(url, data, callback);
    };

    A.API.yesNoPrompt = function (title, text, yesLabel, noLabel, callback) { };

    A.API.helper = {
        formatDate: function (date, includeTime) {
            if (date == null) {
                return '';
            }
            if (date != '') {
                date = new Date(parseInt(date.substr(6)));
                if (includeTime) {
                    date = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                } else {
                    date = date.toLocaleDateString();
                }
                return date;
            }
        },

        setOrHide: function (input, value, includeLabel, includeParent) {
            if (value && value != '') {
                input.text(value);
            } else {
                if (includeLabel) {
                    if (includeParent) {
                        $('[for="' + input.attr('id') + '"]').parent().hide();
                        input.parent().hide();
                    } else {
                        $('[for="' + input.attr('id') + '"]').hide();
                        input.hide();
                    }
                } else {
                    if (includeParent) {
                        input.parent().hide();
                    } else {
                        input.hide();
                    }
                }
            }
        },

        encodeValue: function (value) {
            return (value != null) ? encodeURIComponent(value) : '';
        },

        createObj: function (o) {
            return jQuery.extend({}, o);
        }
    };

    //****************************************************************************
    //************** General Accumulus Entities Objects **************************
    //****************************************************************************

    A.CustomFieldType = {
        string: 1,
        date: 2,
        number: 3,
        list: 4
    };

    // @constructor
    A.Customer = function (customer) {
        if (customer) {
            $.extend(this, customer);
        }
    };

    A.Customer.prototype = {
        getFullName: function () {
            var c = this;
            if (c.Name && (c.Name != "")) {
                return c.Name;
            }
            var prefix = (c.NamePrefix) ? c.NamePrefix + " " : "";
            var firstName = (c.FirstName) ? c.FirstName + " " : "";
            var middleName = (c.MiddleName) ? c.MiddleName + " " : "";
            var lastName = (c.LastName) ? c.LastName + " " : "";
            var suffix = (c.NameSuffix) ? c.NameSuffix : "";
            return (prefix + firstName + middleName + lastName + suffix).trim();
        },

        toJson: function () {
            var encodeValue = A.API.helper.encodeValue;
            return {
                name: encodeValue(this.Name),
                company: encodeValue(this.Company),

                addr1: encodeValue(this.AddressLine1),
                addr2: encodeValue(this.AddressLine2),
                city: encodeValue(this.City),
                state: encodeValue(this.StateProvinceCode),
                postal: encodeValue(this.PostalCode),
                country: encodeValue(this.CountryCode),

                email: encodeValue(this.EmailAddress),
                pwd: encodeValue(this.Password),
                home: encodeValue(this.HomeNumber),
                mobile: encodeValue(this.MobileNumber),
                title: encodeValue(this.Title),
                url: encodeValue(this.WebPageURL),
                work: encodeValue(this.WorkNumber),
                eid: encodeValue(this.ExternalCustomerID),
                lc: encodeValue(this.LanguageCode),
                currency: encodeValue(this.CurrencyCode),
                taxNumber: encodeValue(this.TaxNumber),
                taxCode: encodeValue(this.TaxCode)
            };
        },

        // @deprecated.
        toJSON: function () {
            console.warn('"toJSON" is deprecated. Please use "toJson" instead.');
            return this.toJson();
        }
    };

    // @deprecated
    A.Customer.create = function (customer) {
        console.warn('"Accumulus.Customer.create" is deprecated. Please use "new Accumulus.Customer(customer)" instead.');
        return new A.Customer(customer);
    };

    // @constructor
    A.Signup = function (tenantID, token, requestID, timestamp, customer, subscription) {
        this.tenantID = tenantID;
        this.token = token;
        this.customer = customer;
        this.subscription = subscription;
        this.requestID = requestID;
        this.timestamp = timestamp;
    };

    A.Signup.prototype = {
        toJson: function () {
            return {
                tid: this.tenantID,
                tk: this.token,
                rid: A.API.helper.encodeValue(this.requestID),
                ts: A.API.helper.encodeValue(this.timestamp),
                cu: this.customer != null ? this.customer.toJson() : "",
                su: this.subscription != null ? this.subscription.toJson() : "",
                cc: this.creditCard != null ? this.creditCard.toJson() : "",
                ba: this.bankAccount != null ? this.bankAccount.toJson() : "",
                pp: this.billingAgreement != null ? this.billingAgreement.toJson() : "",
                grecaptcha: (typeof grecaptcha === 'undefined') ? "" : grecaptcha.getResponse()
            };
        },

        // @deprecated
        toJSON: function () {
            console.warn('"toJSON" is deprecated. Please use "toJson" instead.');
            return this.toJson();
        }
    };

    // @constructor
    A.Subscription = function (offerCode, subscription) {
        this.items = [];
        this.offerCode = offerCode;
        this.startDate = new Date();
        if (subscription) {
            $.extend(this, subscription);
        }
    };

    A.Subscription.prototype = {
        createItem: function () {
            var item = new A.SubscriptionItem();
            this.items.push(item);
            return item;
        },

        toJson: function () {
            var jsonItems = [];
            for (var i in this.items) {
                jsonItems.push(this.items[i].toJson());
            }
            var d = this.startDate;
            var s = A.format('${0}-${1}-${2}', [d.getFullYear(), d.getMonth() + 1, d.getDate()]);
            return {
                itm: jsonItems,
                offer: this.offerCode,
                promotion: this.promotionCode,
                reseller: this.resellerID,
                startDate: s
            };
        },

        // @deprecated
        toJSON: function () {
            console.warn('"toJSON" is deprecated. Please use "toJson" instead.');
            return this.toJson();
        }
    };

    // @deprecated
    A.Subscription.create = function (offerCode, subscription) {
        console.warn('"Accumulus.Subscription.create" is deprecated. Please use "new Accumulus.Subscription(offerCode, subscription)" instead.');
        return new A.Subscription(offerCode, subscription);
    };

    // @constructor
    A.SubscriptionItem = function (item) {
        this.fields = [];
        if (item) {
            $.extend(this, item);
        }
    };

    A.SubscriptionItem.prototype = {
        createField: function () {
            var field = new A.SubscriptionItemField();
            this.fields.push(field);
            return field;
        },

        toJson: function () {
            var jsonFields = [];
            for (var i in this.fields) {
                jsonFields.push(this.fields[i].toJson());
            }
            return {
                code: this.productCode,
                id: this.subscriptionItemID,
                fld: jsonFields
            };
        },

        // @deprecated
        toJSON: function () {
            console.warn('"toJSON" is deprecated. Please use "toJson" instead.');
            return this.toJson();
        }
    };

    // @deprecated
    A.SubscriptionItem.create = function (item) {
        console.warn('"Accumulus.SubscriptionItem.create" is deprecated. Please use "new Accumulus.SubscriptionItem(item)" instead.');
        return new A.SubscriptionItem(item);
    };

    // @constructor
    A.SubscriptionItemField = function () { };

    A.SubscriptionItemField.prototype = {
        toJson: function () {
            return {
                code: this.code,
                val: this.value
            };
        },

        // @deprecated
        toJSON: function () {
            console.warn('"toJSON" is deprecated. Please use "toJson" instead.');
            return this.toJson();
        }
    };

    // @deprecated
    A.SubscriptionItemField.create = function () {
        console.warn('"Accumulus.SubscriptionItemField.create" is deprecated. Please use "new Accumulus.SubscriptionItemField()" instead.');
        return new A.SubscriptionItemField();
    };

    // @constructor
    A.CreditCard = function (creditCard) {
        if (creditCard) {
            $.extend(this, creditCard);
        }
    };

    A.CreditCard.prototype = {
        toJson: function () {
            var encodeValue = A.API.helper.encodeValue;
            return {
                number: encodeValue(this.cardNumber),
                name: encodeValue(this.name),
                cvv: encodeValue(this.cvv),
                exp: encodeValue(this.expirationDate),

                company: encodeValue(this.company),
                addr1: encodeValue(this.addr1),
                addr2: encodeValue(this.addr2),
                city: encodeValue(this.city),
                state: encodeValue(this.stateProvinceCode),
                postal: encodeValue(this.postalCode),
                country: encodeValue(this.countryCode)
            };
        },

        // @deprecated
        toJSON: function () {
            console.warn('"toJSON" is deprecated. Please use "toJson" instead.');
            return this.toJson();
        }
    };

    // @deprecated
    A.CreditCard.create = function (creditCard) {
        console.warn('"Accumulus.CreditCard.create" is deprecated. Please use "new Accumulus.CreditCard(creditCard)" instead.');
        return new A.CreditCard(creditCard);
    };

    // @constructor
    A.BankAccount = function (bankAccount) {
        if (bankAccount) {
            $.extend(this, bankAccount);
        }
    };

    A.BankAccount.prototype = {
        toJson: function () {
            var encodeValue = A.API.helper.encodeValue;
            return {
                number: encodeValue(this.number),
                type: encodeValue(this.type),
                route: encodeValue(this.route),
                bank: encodeValue(this.bank),
                name: encodeValue(this.name),

                company: encodeValue(this.company),
                addr1: encodeValue(this.addr1),
                addr2: encodeValue(this.addr2),
                city: encodeValue(this.city),
                state: encodeValue(this.stateProvinceCode),
                postal: encodeValue(this.postalCode),
                country: encodeValue(this.countryCode)
            };
        },

        // @deprecated
        toJSON: function () {
            console.warn('"toJSON" is deprecated. Please use "toJson" instead.');
            return this.toJson();
        }
    };

    // @deprecated
    A.BankAccount.create = function (bankAccount) {
        console.warn('"Accumulus.BankAccount.create" is deprecated. Please use "new Accumulus.BankAccount(bankAccount)" instead.');
        return new A.BankAccount(bankAccount);
    };

    // @constructor
    A.BillingAgreement = function (billingAgreement) {
        if (billingAgreement) {
            $.extend(this, billingAgreement);
        }
    };

    A.BillingAgreement.prototype = {
        toJson: function () {
            var encodeValue = A.API.helper.encodeValue;
            //TODO:Remove email and name when they get removed from the backend.
            return {
                name: encodeValue(this.name),
                email: encodeValue(this.email),
                confirmUrl: encodeValue(this.confirmUrl),
                cancelUrl: encodeValue(this.cancelUrl)
            };
        },

        // @deprecated
        toJSON: function () {
            console.warn('"toJSON" is deprecated. Please use "toJson" instead.');
            return this.toJson();
        }
    };

    // @deprecated
    A.BillingAgreement.create = function (billingAgreement) {
        console.warn('"Accumulus.BillingAgreement.create" is deprecated. Please use "new Accumulus.BillingAgreement(billingAgreement)" instead.');
        return new A.BillingAgreement(billingAgreement);
    };

    A.getAllCountries = function () {
        return "" +
            '<option value="AFG">Afghanistan</option>' +
            '<option value="ALB">Albania</option>' +
            '<option value="DZA">Algeria</option>' +
            '<option value="ARG">Argentina</option>' +
            '<option value="ARM">Armenia</option>' +
            '<option value="AUS">Australia</option>' +
            '<option value="AUT">Austria</option>' +
            '<option value="AZE">Azerbaijan</option>' +
            '<option value="BHR">Bahrain</option>' +
            '<option value="BGD">Bangladesh</option>' +
            '<option value="BLR">Belarus</option>' +
            '<option value="BEL">Belgium</option>' +
            '<option value="BLZ">Belize</option>' +
            '<option value="VEN">Bolivarian Republic of Venezuela</option>' +
            '<option value="BOL">Bolivia</option>' +
            '<option value="BIH">Bosnia and Herzegovina</option>' +
            '<option value="BRA">Brazil</option>' +
            '<option value="BRN">Brunei Darussalam</option>' +
            '<option value="BGR">Bulgaria</option>' +
            '<option value="KHM">Cambodia</option>' +
            '<option value="CAN">Canada</option>' +
            '<option value="029">Caribbean</option>' +
            '<option value="CHL">Chile</option>' +
            '<option value="COL">Colombia</option>' +
            '<option value="CRI">Costa Rica</option>' +
            '<option value="HRV">Croatia</option>' +
            '<option value="CYP">Cyprus</option>' +
            '<option value="CZE">Czech Republic</option>' +
            '<option value="DNK">Denmark</option>' +
            '<option value="DOM">Dominican Republic</option>' +
            '<option value="ECU">Ecuador</option>' +
            '<option value="EGY">Egypt</option>' +
            '<option value="SLV">El Salvador</option>' +
            '<option value="EST">Estonia</option>' +
            '<option value="ETH">Ethiopia</option>' +
            '<option value="FRO">Faroe Islands</option>' +
            '<option value="FIN">Finland</option>' +
            '<option value="FRA">France</option>' +
            '<option value="GEO">Georgia</option>' +
            '<option value="DEU">Germany</option>' +
            '<option value="GRC">Greece</option>' +
            '<option value="GRL">Greenland</option>' +
            '<option value="GTM">Guatemala</option>' +
            '<option value="HND">Honduras</option>' +
            '<option value="HKG">Hong Kong S.A.R.</option>' +
            '<option value="HUN">Hungary</option>' +
            '<option value="ISL">Iceland</option>' +
            '<option value="IND">India</option>' +
            '<option value="IDN">Indonesia</option>' +
            '<option value="IRN">Iran</option>' +
            '<option value="IRQ">Iraq</option>' +
            '<option value="IRL">Ireland</option>' +
            '<option value="PAK">Islamic Republic of Pakistan</option>' +
            '<option value="ISR">Israel</option>' +
            '<option value="ITA">Italy</option>' +
            '<option value="JAM">Jamaica</option>' +
            '<option value="JPN">Japan</option>' +
            '<option value="JOR">Jordan</option>' +
            '<option value="KAZ">Kazakhstan</option>' +
            '<option value="KEN">Kenya</option>' +
            '<option value="KOR">Korea</option>' +
            '<option value="KWT">Kuwait</option>' +
            '<option value="KGZ">Kyrgyzstan</option>' +
            '<option value="LAO">Lao P.D.R.</option>' +
            '<option value="LVA">Latvia</option>' +
            '<option value="LBN">Lebanon</option>' +
            '<option value="LBY">Libya</option>' +
            '<option value="LIE">Liechtenstein</option>' +
            '<option value="LTU">Lithuania</option>' +
            '<option value="LUX">Luxembourg</option>' +
            '<option value="MAC">Macao S.A.R.</option>' +
            '<option value="MKD">Macedonia (FYROM)</option>' +
            '<option value="MYS">Malaysia</option>' +
            '<option value="MDV">Maldives</option>' +
            '<option value="MLT">Malta</option>' +
            '<option value="MEX">Mexico</option>' +
            '<option value="MNG">Mongolia</option>' +
            '<option value="MNE">Montenegro</option>' +
            '<option value="MAR">Morocco</option>' +
            '<option value="NPL">Nepal</option>' +
            '<option value="NLD">Netherlands</option>' +
            '<option value="NZL">New Zealand</option>' +
            '<option value="NIC">Nicaragua</option>' +
            '<option value="NGA">Nigeria</option>' +
            '<option value="NOR">Norway</option>' +
            '<option value="OMN">Oman</option>' +
            '<option value="PAN">Panama</option>' +
            '<option value="PRY">Paraguay</option>' +
            '<option value="CHN">People\'s Republic of China</option>' +
            '<option value="PER">Peru</option>' +
            '<option value="PHL">Philippines</option>' +
            '<option value="POL">Poland</option>' +
            '<option value="PRT">Portugal</option>' +
            '<option value="MCO">Principality of Monaco</option>' +
            '<option value="PRI">Puerto Rico</option>' +
            '<option value="QAT">Qatar</option>' +
            '<option value="ROU">Romania</option>' +
            '<option value="RUS">Russia</option>' +
            '<option value="RWA">Rwanda</option>' +
            '<option value="SAU">Saudi Arabia</option>' +
            '<option value="SEN">Senegal</option>' +
            '<option value="SRB">Serbia</option>' +
            '<option value="SCG">Serbia and Montenegro (Former)</option>' +
            '<option value="SGP">Singapore</option>' +
            '<option value="SVK">Slovakia</option>' +
            '<option value="SVN">Slovenia</option>' +
            '<option value="ZAF">South Africa</option>' +
            '<option value="ESP">Spain</option>' +
            '<option value="LKA">Sri Lanka</option>' +
            '<option value="SWE">Sweden</option>' +
            '<option value="CHE">Switzerland</option>' +
            '<option value="SYR">Syria</option>' +
            '<option value="TWN">Taiwan</option>' +
            '<option value="TAJ">Tajikistan</option>' +
            '<option value="THA">Thailand</option>' +
            '<option value="TTO">Trinidad and Tobago</option>' +
            '<option value="TUN">Tunisia</option>' +
            '<option value="TUR">Turkey</option>' +
            '<option value="TKM">Turkmenistan</option>' +
            '<option value="ARE">U.A.E.</option>' +
            '<option value="UKR">Ukraine</option>' +
            '<option value="GBR">United Kingdom</option>' +
            '<option value="USA">United States</option>' +
            '<option value="URY">Uruguay</option>' +
            '<option value="UZB">Uzbekistan</option>' +
            '<option value="VNM">Vietnam</option>' +
            '<option value="YEM">Yemen</option>' +
            '<option value="ZWE">Zimbabwe</option>';
    };

    //****************************************************************************
    //************** Add validation rules ****************************************
    //****************************************************************************
    $.validator.addMethod("oneDigit", function (value, element) {
        return /\d/.test(value);
    }, "Value must contain at least one digit.");

    $.validator.addMethod("oneSpecialChar", function (value, element) {
        return /@|%|'|&|!|#|:|{|}|~|-|_|\(|\)|\?|\.|\+|\^|\$|\/|\\/.test(value);
    }, "Value must contain at least one special char.");

    Accumulus = $.extend(true, A, Accumulus);
});

var Accumulus = {
    constants: {
        UI: 'ui',
        MOBILE: 'mobile',
        CREDIT_CARD: "creditCard",
        BANK_ACCOUNT: "bankAccount",
        BILLING_AGREEMENT: "billingAgreement"
    }
};

// As loading...
(function ($) {
    //Widgets Definition
    $.widget("accumulus.widget", {
        options: {
            tenantID: null,
            token: null,
            requestID: null,
            timestamp: null,
            customerID: null,
            messages: {},
            serverErrorCallback: null
        },

        _accessInfo: { tid: null, tk: null, rid: null, ts: null, cid: null },

        _create: function () {
            var widget = this;
            var $container = widget.element;
            $container.addClass('acc-widget');
            widget._setAccessInfo();

            if (Accumulus.isReady) {
                widget._initPlugin();
            } else {
                $(Accumulus).on('ready', function () {
                    widget._initPlugin();
                });
            }
        },

        _setAccessInfo: function () {
            var widget = this;
            var accessInfo = {
                tid: widget.options.tenantID,
                tk: widget.options.token,
                rid: widget.options.requestID,
                ts: widget.options.timestamp,
                cid: widget.options.customerID
            };
            $.extend(widget._accessInfo, accessInfo);
        },

        _serverError: function (data, $container) {
            Accumulus.error(data.Code + " " + data.Message);
            var widget = this;
            var serverErrorCallback = widget.options.serverErrorCallback;
            if (serverErrorCallback) {
                if (serverErrorCallback(data) !== false) {
                    widget._showError(Accumulus.getErrorMsg(data), $container);
                }
            } else {
                widget._showError(Accumulus.getErrorMsg(data), $container);
            }
        },

        _showError: function (msg, $container) {
            if ($container) {
                $container.text(msg);
            } else {
                $container = this.element.find('.acc-server-error');
                if ($container.length == 0) {
                    $container = this._createServerErrorWrapper(msg);
                    this.element.html($container);
                } else {
                    $container.text(msg);
                }
            }
            $container.show();

            $("html,body").animate(
                { scrollTop: $container.offset().top - 100 }, 100);
        },

        _createServerErrorWrapper: function (msg) { },
        _openModal: function (modal) { },
        _closeModal: function (modal) { },

        _setOption: function (key, value) { },

        _destroy: function () {
            this.element.removeClass('acc-widget').empty();
        }
    });

    $.widget("accumulus.portalPlugin", $.accumulus.widget, {
        options: {
            showHeader: true
        }
    });

    $.widget("accumulus.balance", $.accumulus.portalPlugin, {
        options: {},
        _balance: null,
        _balanceView: null,

        _initPlugin: function () {
            var widget = this;
            widget._balanceView = Accumulus.plugins.balance.balanceView;
            widget._balanceView.getContent(function (content) {
                widget._loadBalance();
            });
        },

        _loadBalance: function () {
            var balance = this;
            balance._fetchBalance(function (success, data) {
                if (success) {
                    balance._balance = data.Balance;
                    balance._initView();
                    balance._fillView();
                } else {
                    balance._serverError(data);
                }
            });
        },

        _fetchBalance: function (callback) {
            Accumulus.info("Loading balance info from server...");
            var url = Accumulus.serviceUrl + "/GetCustomerBalance";
            Accumulus.API.jsonpCall(url, this._accessInfo, callback);
        },

        _initView: function () {
            var widget = this;
            var $container = this.element;
            $container.empty().append(widget._balanceView.content);

            if (!widget.options.showHeader) {
                $container.find('.acc-widget-title').hide();
            }

            Accumulus.localize($container, Accumulus.labels.balance);
        },

        _fillView: function () {
            var $e = this.element.find('.acc-current-balance').text(this._balance);
            Accumulus.formatCurrency($e);
        }
    });

    $.widget("accumulus.profile", $.accumulus.portalPlugin, {
        options: {
            customerEdit: null,
            lockEmail: false,
            passwordChange: null,
            showChangePassword: true,
            taxInformationCountries: null,
            vatOnEServices: false
        },

        _profileView: null,
        _profileEditView: null,
        _customer: null,
        _$viewForm: null,
        _$passwordForm: null,
        _$editContainer: null,

        _create: function () {
            var widget = this;
            widget._profileView = Accumulus.plugins.profile.profileView;
            widget._profileEditView = Accumulus.plugins.profile.profileEditView;
            widget._super();
        },

        _initPlugin: function () {
            var widget = this;
            widget._profileView.getContent(function (content) {
                widget._loadCustomer();
            });
        },

        _loadCustomer: function () {
            var widget = this;
            widget._fetchCustomer(function (success, data) {
                if (success) {
                    widget._customer = data.Customer;
                    widget._initViewForm();
                    widget._fillViewForm();
                } else {
                    widget._serverError(data);
                }
            });
        },

        _fetchCustomer: function (callback) {
            Accumulus.info("Loading customer info from server...");
            var url = Accumulus.serviceUrl + "/GetCustomer";
            Accumulus.API.jsonpCall(url, this._accessInfo, callback);
        },

        _initViewForm: function () {
            var widget = this;
            var $container = this.element;

            $container.empty().append(widget._profileView.content);

            var $viewForm = $container.find('.acc-profile-view');
            widget._$viewForm = $viewForm;

            if (!widget.options.showHeader) {
                $container.find('.acc-widget-title').hide();
            }

            // if tax identifier countries have not been specified and Vat on eServices is true, setup the default VoE configuration
            if (widget.options.vatOnEServices && !widget.options.taxInformationCountries) {
                widget.options.taxInformationCountries = Accumulus.global.vatOnEServicesCountries;
                if (widget._customer && widget._customer.CountryCode in widget.options.taxInformationCountries) {
                    widget.element.find('.acc-tax-information').show();
                } else {
                    widget.element.find('.acc-tax-information').hide();
                }
            }

            Accumulus.localize($viewForm, Accumulus.labels.profile);

            $viewForm.find(".acc-edit").bind("click", function (event, ui) {
                widget._edit();
            });
        },

        _edit: function () {
            var widget = this;
            widget._$viewForm.hide();
            widget._profileEditView.getContent(function (content) {
                widget._initEditForm();
                widget._fillEditForm();
            });
        },

        _initEditForm: function () {
            var widget = this;
            var $container = widget.element;

            $container.append(widget._profileEditView.content);
            var $editContainer = $container.find('.acc-profile-edit-view');
            var $editForm = $editContainer.find('.acc-profile-edit-form');
            var $passwordForm = $editContainer.find('.acc-profile-edit-password-form');

            widget._$passwordForm = $passwordForm;
            widget._$editContainer = $editContainer;

            Accumulus.localize($editContainer, Accumulus.labels.profile);

            if (widget.options.lockEmail) {
                $container.find('[name="email"]').prop('disabled', true);
            }

            if (!widget.options.showHeader) {
                $container.find('.acc-widget-title').hide();
            }

            if (!widget.options.showChangePassword) {
                $container.find('.acc-change-password').hide();
            }

            // if tax identifier countries have not been specified and Vat on eServices is true, setup the default VoE configuration
            if (widget.options.vatOnEServices && !widget.options.taxInformationCountries) {
                widget.options.taxInformationCountries = Accumulus.global.vatOnEServicesCountries;
            }

            Accumulus.hookUpStateAndCountry(
                widget,
                $editForm.find('[name="state"]'),
                widget._customer.StateProvinceCode,
                $editForm.find('[name="country"]'),
                widget._customer.CountryCode);

            $editForm.find('.acc-cancel').click(function () {
                widget._cancel();
            });

            $passwordForm.find('.acc-cancel').click(function () {
                widget._cancelPassword();
            });

            var gLabels = Accumulus.labels.general;

            $editForm.validate({
                submitHandler: function (form) {
                    widget._save();
                },
                rules: {
                    name: {
                        required: true
                    },
                    country: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    name: gLabels['nameRequired'],
                    country: gLabels['countryRequired'],
                    email: {
                        required: gLabels['emailRequired'],
                        email: gLabels['notEmailFormat']
                    }
                },
                errorPlacement: widget._validationErrorPlacement
            });

            $passwordForm.validate({
                submitHandler: function (form) {
                    widget._changePassword();
                },
                rules: {
                    "new-password-1": {
                        required: true,
                        minlength: 7,
                        oneDigit: true,
                        oneSpecialChar: true
                    },
                    "new-password-2": {
                        required: true,
                        equalTo: '[name="new-password-1"]'
                    }
                },
                messages: {
                    "new-password-1": {
                        required: gLabels['newPasswordRequired'],
                        oneDigit: gLabels['oneDigitRequired'],
                        minlength: gLabels['minSevenCharsLength'],
                        oneSpecialChar: gLabels['oneSpecialChar']
                    },
                    "new-password-2": {
                        required: gLabels['newPasswordRequired'],
                        equalTo: gLabels['equalBothPasswords']
                    }
                },
                errorPlacement: widget._validationErrorPlacement
            });
        },

        _cancel: function () {
            this._$editContainer.remove();
            $('#acc-popup-password').remove();
            this._$viewForm.show();
        },

        _cancelPassword: function () { },

        _save: function () {
            var widget = this;
            var customerEditCallback = widget.options.customerEdit;

            this._populateCustomer();
            this._updateCustomer(function (success, data) {
                if (success) {
                    widget._$editContainer.remove();
                    $('#acc-popup-password').remove();
                    widget._$viewForm.remove();
                    widget._loadCustomer();
                } else {
                    widget._serverError(data);
                }
                if (typeof customerEditCallback == 'function') customerEditCallback(success, data);
            });
        },

        _populateCustomer: function () {
            var c = this._customer;
            var $editForm = this._$editContainer;
            c.Name = $editForm.find('[name="name"]').val();
            c.Company = $editForm.find('[name="company"]').val();
            c.Title = $editForm.find('[name="title"]').val();
            c.EmailAddress = $editForm.find('[name="email"]').val();
            c.WorkNumber = $editForm.find('[name="work-number"]').val();
            c.HomeNumber = $editForm.find('[name="home-number"]').val();
            c.MobileNumber = $editForm.find('[name="mobile"]').val();
            c.AddressLine1 = $editForm.find('[name="address1"]').val();
            c.AddressLine2 = $editForm.find('[name="address2"]').val();
            c.City = $editForm.find('[name="city"]').val();
            c.PostalCode = $editForm.find('[name="postal-code"]').val();
            c.StateProvinceCode = $editForm.find('[name="state"]').val();
            c.CountryCode = $editForm.find('[name="country"]').val();
            c.WebPageURL = $editForm.find('[name="url"]').val();
            if (this.options.taxInformationCountries && c.CountryCode in this.options.taxInformationCountries) {
                c.TaxNumber = this.element.find('[name="taxNumber"]').val();
                if (c.TaxNumber) {
                    c.TaxCode = this.options.taxInformationCountries[c.CountryCode];
                }
            }
        },

        _updateCustomer: function (callback) {
            Accumulus.info('Submitting customer for update...');
            var url = Accumulus.serviceUrl + '/UpdateCustomer';
            var customer = new Accumulus.Customer(this._customer);
            var json = { cu: customer.toJson() };
            $.extend(json, this._accessInfo);
            Accumulus.API.jsonpCall(url, json, callback);
        },

        _changePassword: function () {
            var widget = this;
            var $passwordForm = widget._$passwordForm;
            var passwordChangeCallback = widget.options.passwordChange;
            var $errorContainer = $passwordForm.find('.acc-server-error');

            var newPassword1 = $passwordForm.find('[name="new-password-1"]').val();

            //TODO: Do we want to encrypt this password?
            widget._updatePassword(newPassword1, function (success, data) {
                if (success) {
                    widget._closeModal($('#acc-popup-password'));
                    //$('#acc-popup-password').remove();
                } else {
                    widget._serverError(data, $errorContainer);
                }
                if (typeof passwordChangeCallback == 'function') passwordChangeCallback(success, data);
            });
        },

        _updatePassword: function (newPassword, callback) {
            var url = Accumulus.serviceUrl + '/CustomerChangePassword';
            var data = { cu: { existingPassword: '----', newPassword: newPassword } };//TODO: remove existing password?
            $.extend(data, this._accessInfo);
            Accumulus.API.jsonpCall(url, data, callback);
        },

        _fillEditForm: function () {
            var widget = this;
            var c = widget._customer;
            var $editForm = widget._$editContainer;
            $editForm.find('[name="name"]').val(new Accumulus.Customer(c).getFullName());
            $editForm.find('[name="company"]').val(c.Company);
            $editForm.find('[name="title"]').val(c.Title);
            $editForm.find('[name="email"]').val(c.EmailAddress);
            $editForm.find('[name="work-number"]').val(c.WorkNumber);
            $editForm.find('[name="home-number"]').val(c.HomeNumber);
            $editForm.find('[name="mobile"]').val(c.MobileNumber);
            $editForm.find('[name="address1"]').val(c.AddressLine1);
            $editForm.find('[name="address2"]').val(c.AddressLine2);
            $editForm.find('[name="city"]').val(c.City);
            $editForm.find('[name="postal-code"]').val(c.PostalCode);
            $editForm.find('[name="country"]').val(c.CountryCode);
            $editForm.find('[name="url"]').val(c.WebPageURL);
            $editForm.find('[name="taxNumber"]').val(c.TaxExemptionNumber);
        },

        _fillViewForm: function () {
            var c = this._customer;
            var $viewForm = this._$viewForm;
            var setOrHide = Accumulus.API.helper.setOrHide;

            var mobileField = $viewForm.find('.acc-mobile');
            var homeField = $viewForm.find('.acc-home-number');
            var workField = $viewForm.find('.acc-work-number');
            var address1Field = $viewForm.find('.acc-address1');
            var address2Field = $viewForm.find('.acc-address2');
            var cityField = $viewForm.find('.acc-city');
            var stateField = $viewForm.find('.acc-state');
            var postalCodeField = $viewForm.find('.acc-postal-code');
            var countryField = $viewForm.find('.acc-country');
            var taxNumberField = $viewForm.find('.acc-tax-number');

            $viewForm.find('.acc-name').text(new Accumulus.Customer(c).getFullName());
            $viewForm.find('.acc-email').text(c.EmailAddress);

            setOrHide(mobileField, c.MobileNumber, false, true);
            setOrHide(homeField, c.HomeNumber, false, true);
            setOrHide(workField, c.WorkNumber, false, true);
            setOrHide(workField, c.WorkNumber, false, true);

            setOrHide(address1Field, c.AddressLine1);
            setOrHide(address2Field, c.AddressLine2);
            setOrHide(cityField, c.City);
            setOrHide(stateField, c.StateProvince);
            setOrHide(postalCodeField, c.PostalCode);

            if (!c.TaxExemptionNumber) {
                $viewForm.find('.acc-tax-information').hide();
            } else {
                setOrHide(taxNumberField, c.TaxExemptionNumber);
            }

            //TODO: Modify this when the Countries form gets refactored to a JSon structure.
            var countryOptions = Accumulus.getAllCountries();
            var html = $.parseHTML(countryOptions);
            var country = $('<div></div>').html(html).find('option[value="' + c.CountryCode + '"]').text();

            setOrHide(countryField, country);
        }
    });

    $.widget("accumulus.subscriptionList", $.accumulus.portalPlugin, {
        options: {
            cancelSubscription: true,
            itemFieldsHandler: null
        },

        _subscriptionsView: null,
        _editSubscriptionView: null,
        _subscriptions: null,
        _$viewForm: null,
        _$detailsContainer: null,
        _$editContainer: null,
        _subscription: null,

        _initPlugin: function () {
            var widget = this;
            widget._subscriptionsView = Accumulus.plugins.subscriptionList.subscriptionsView;
            widget._subscriptionsView.getContent(function (content) {
                widget._loadSubscriptions();
            });
        },

        _loadSubscriptions: function () {
            var widget = this;
            widget._fetchSubscriptions(function (success, data) {
                if (success) {
                    widget._subscriptions = data.Subscriptions;
                    widget._initSubscriptionsView();
                    widget._fillSubscriptionsView();
                } else {
                    widget._serverError(data);
                }
            });
        },

        _fetchSubscriptions: function (callback) {
            Accumulus.info("Loading subscriptions info from server...");
            var url = Accumulus.serviceUrl + "/GetSubscriptions";
            Accumulus.API.jsonpCall(url, this._accessInfo, callback);
        },

        _initSubscriptionsView: function () {
            var widget = this;
            var $container = this.element;
            $container.empty().append(widget._subscriptionsView.content);

            var $viewForm = $container.find('.acc-subscriptions-view');
            widget._$viewForm = $viewForm;

            if (!widget.options.showHeader) {
                $container.find('.acc-widget-title').hide();
            }

            Accumulus.localize($viewForm, Accumulus.labels.subscriptionList);
        },

        _fillSubscriptionsView: function () {
            var widget = this;
            var $container = widget.element;
            var subscriptions = widget._subscriptions;
            var tableBody = widget._$viewForm.find('.acc-subscription-list tbody');
            tableBody.empty();

            if (subscriptions.length > 0) {
                for (var i in subscriptions) {
                    var s = subscriptions[i];
                    var id = s.SubscriptionID;
                    var offer = s.OfferName;
                    var status = s.Status;
                    var startDate = Accumulus.API.helper.formatDate(s.StartDate);

                    var tr = $('<tr></tr>');

                    $('<td></td>').append(
                        $('<a></a>').text(id)
                            .data('s', s)
                            .click(
                                function (event, ui) {
                                    widget._subscription = $(this).data('s');
                                    widget._details();
                                }
                        ).attr("href", "#")
                    ).appendTo(tr);

                    $('<td></td>').text(offer).appendTo(tr);
                    $('<td></td>').text(status).appendTo(tr);
                    $('<td></td>').text(startDate).appendTo(tr);

                    tableBody.append(tr);
                }
            } else {
                $container.find('.acc-subscription-list').hide();
                var noSubscriptionsLabel = Accumulus.labels.subscriptionList.noSubscriptions || 'No subscriptions.';

                $('<div></div>').text(noSubscriptionsLabel)
                    .appendTo($container.find('.acc-subscriptions-view'));
            }
        },

        _details: function () {
            var widget = this;
            widget._$viewForm.hide();
            widget._editSubscriptionView = Accumulus.plugins.subscriptionList.editSubscriptionView;
            widget._editSubscriptionView.getContent(function (content) {
                widget._initDetailsForm();
                widget._fillDetailsForm();
            });
        },

        _initDetailsForm: function () {
            var widget = this;
            var $container = this.element;

            $container.append(widget._editSubscriptionView.content);

            var $detailsContainer = $container.find('.subscription-edit-view');

            widget._$detailsContainer = $detailsContainer;

            Accumulus.localize($detailsContainer, Accumulus.labels.subscriptionList);

            $detailsContainer.find('.acc-ok').bind("click", function (event, ui) {
                widget._cancel();
            });

            if (widget.options.cancelSubscription) {
                var cancelSubscriptionBtn = $detailsContainer.find('.acc-cancel-subscription');
                cancelSubscriptionBtn.bind("click", function (event, ui) {
                    var slLabels = Accumulus.labels.subscriptionList;
                    var gLabels = Accumulus.labels.general;
                    Accumulus.API.yesNoPrompt(
                        gLabels['areYouSure?'], slLabels.confirmSubscriptionCancel,
                        gLabels.yes, gLabels.no,
                        function (confirm) {
                            if (confirm) {
                                widget._cancelSubscription();
                            }
                        }
                    )
                });
                cancelSubscriptionBtn.show();
            }
        },

        _cancel: function () {
            this._$detailsContainer.remove();
            this._$viewForm.show();
        },

        _cancelSubscription: function () {
            var widget = this;
            widget._submitSubscriptionCancel(function (success, data) {
                if (success) {
                    widget._$detailsContainer.remove();
                    widget._$viewForm.remove();
                    widget._loadSubscriptions();
                } else {
                    widget._serverError(data);
                }
            });
        },

        _submitSubscriptionCancel: function (callback) {
            Accumulus.info("Submitting subscription cancel to the server...");
            var widget = this;
            var url = Accumulus.serviceUrl + "/UpdateSubscriptionStatus";
            var data = $.extend({
                sid: widget._subscription.SubscriptionID,
                status: 'Closed'
            }, widget._accessInfo);

            Accumulus.API.jsonpCall(url, data, callback);
        },

        _fillDetailsForm: function () {
            var widget = this;
            var s = widget._subscription;

            var $detailsContainer = this._$detailsContainer;

            var startDate = Accumulus.API.helper.formatDate(s.StartDate);
            var freeTrialEndDate = Accumulus.API.helper.formatDate(s.FreeTrialEndDate);

            var subscriptionID = s.SubscriptionID || '';
            var offerName = s.OfferName || '';

            var status = s.Status || '';
            /*if(status == 'Inactive'){
                $detailsContainer.find('.acc-cancel-subscription').addClass('ui-disabled');
            }*/

            try {
                var status = Accumulus.labels.subscriptionList[status] || status; //Localize Status
            } catch (e) { Accumulus.error(e.msg) };

            var setOrHide = Accumulus.API.helper.setOrHide;

            $detailsContainer.find('.acc-id').text(subscriptionID);
            $detailsContainer.find('.acc-offer').text(offerName);

            setOrHide($detailsContainer.find('.acc-promotion-name'), s.PromotionName, true, true);
            $detailsContainer.find('.acc-status').text(status);
            $detailsContainer.find('.acc-start-date').text(startDate);

            setOrHide($detailsContainer.find('.acc-free-trial-end'), freeTrialEndDate, true, true);

            widget._createSubscriptionItems();
        },

        _createSubscriptionItems: function () { }
    });

    $.widget("accumulus.statementHistory", $.accumulus.portalPlugin, {
        options: {},

        _statementsView: null,
        _statements: null,
        _listTableBody: null,

        _initPlugin: function () {
            var widget = this;
            widget._statementsView = Accumulus.plugins.statementHistory.statementsView;
            widget._statementsView.getContent(function (content) {
                widget._loadStatements();
            });
        },

        _loadStatements: function () {
            var widget = this;
            widget._fetchStatements(function (success, data) {
                if (success) {
                    widget._statements = data.Invoices;
                    widget._initStatementsView();
                    widget._fillStatementsList();
                } else {
                    widget._serverError(data);
                }
            });
        },

        _fetchStatements: function (callback) {
            Accumulus.info("Loading statements info from server...");
            var url = Accumulus.serviceUrl + "/GetInvoices";
            Accumulus.API.jsonpCall(url, this._accessInfo, callback);
        },

        _initStatementsView: function () {
            var widget = this;
            var $container = this.element;
            $container.empty().append(widget._statementsView.content);

            var $listTable = $container.find('.acc-statement-list');
            var $listTableBody = $listTable.find('tbody');
            widget._listTableBody = $listTableBody;

            if (!widget.options.showHeader) {
                $container.find('.acc-widget-title').hide();
            }

            Accumulus.localize($container, Accumulus.labels.statementHistory);
        },

        _fillStatementsList: function () {
            var widget = this;
            var $container = widget.element;
            var statements = widget._statements;
            var $tableBody = widget._listTableBody;

            if (statements.length > 0) {
                for (var i in statements) {
                    var statement = statements[i];
                    var date = Accumulus.API.helper.formatDate(statement.InvoiceDate);
                    var tr = $('<tr></tr>');

                    $('<td></td>').append(
                        $('<a></a>').text(statement.InvoiceNumber)
                            .attr("href", statement.InvoiceUrl)
                            .attr("target", '_blank')
                    ).appendTo(tr);

                    $('<td></td>').text(date).appendTo(tr);

                    var $e = $('<td></td>')
                        .text(statement.PreviousBalance)
                        .appendTo(tr);
                    Accumulus.formatCurrency($e);

                    $e = $('<td></td>')
                        .text(statement.FeeTotal)
                        .appendTo(tr);
                    Accumulus.formatCurrency($e);

                    $e = $('<td></td>')
                        .text(statement.PaymentTotal)
                        .appendTo(tr);
                    Accumulus.formatCurrency($e);

                    $e = $('<td></td>')
                        .text(statement.AdjustmentTotal)
                        .appendTo(tr);
                    Accumulus.formatCurrency($e);

                    $e = $('<td></td>')
                        .text(statement.CurrentBalance)
                        .appendTo(tr);
                    Accumulus.formatCurrency($e);

                    $tableBody.append(tr);
                }
            } else {
                $container.find('.acc-statement-list').hide();
                var noStatementsLabel = 'No statements.';
                try {
                    noStatementsLabel = Accumulus.labels.statementHistory.noStatements;
                } catch (e) {
                    Accumulus.info("There's no label for noStatements defined.")
                }
                $('<div></div>').text(noStatementsLabel)
                    .appendTo($container.find('.acc-statement-history-view'));
            }
        }
    });

    $.widget("accumulus.paymentMethods", $.accumulus.portalPlugin, {
        options: {
            showBillingAddress: true,
            showCreditCards: true,
            showBankAccounts: false,
            showBillingAgreements: false,
            confirmUrl: null,
            cancelUrl: null
        },

        _paymentMethodsView: null,

        _defaultPaymentMethodKey: null,

        _$viewForm: null,
        _$detailsContainer: null,

        _bankAccounts: {},
        _billingAgreements: {},
        _creditCards: {},

        _creditCard: null,
        _bankAccount: null,
        _billingAgreement: null,

        _initPlugin: function () {
            var widget = this;
            widget._paymentMethodsView = Accumulus.plugins.paymentMethods.paymentMethodsView;
            widget._paymentMethodsView.getContent(function (content) {
                widget._loadPaymentMethods();
            });
        },

        _loadPaymentMethods: function () {
            var widget = this;
            widget._fetchPaymentMethods(function (success, data) {
                if (success) {
                    widget._defaultPaymentMethodKey = data.CurrentPaymentMethodKey;
                    widget._bankAccounts = data.BankAccounts;
                    widget._creditCards = data.CreditCards;
                    widget._billingAgreements = data.BillingAgreements;
                    widget._initPaymentMethodsView();
                    widget._fillPaymentMethodsView();
                } else {
                    widget._serverError(data);
                }
            });
        },

        _fetchPaymentMethods: function (callback) {
            Accumulus.info("Loading payment methods info from server...");
            var url = Accumulus.serviceUrl + "/GetPaymentMethods";
            Accumulus.API.jsonpCall(url, this._accessInfo, callback);
        },

        _initPaymentMethodsView: function () {
            var widget = this;
            var $container = widget.element;
            $container.empty().append(widget._paymentMethodsView.content);

            var $viewForm = $container.find('.acc-payment-methods-view');
            widget._$viewForm = $viewForm;

            if (!widget.options.showHeader) {
                $container.find('.acc-widget-title').hide();
            }

            if (widget.options.showCreditCards) {
                $viewForm.find('.acc-add-credit-card').bind(
                    "click", function (event, ui) {
                        widget._addCreditCard();
                    }
                );
            } else {
                $viewForm.find('.acc-credit-cards').hide();
                //$viewForm.find('[name="creditCardsSection"]').hide();
            }

            if (widget.options.showBankAccounts) {
                $viewForm.find('.acc-add-bank-account').bind(
                    "click", function (event, ui) {
                        widget._addBankAccount();
                    }
                );
            } else {
                $viewForm.find('.acc-bank-accounts').hide();
            }

            if (widget.options.showBillingAgreements) {
                $viewForm.find('.acc-add-billing-agreement').bind(
                    "click", function (event, ui) {
                        widget._addBillingAgreement();
                    }
                );
                $viewForm.find('.acc-reload-billing-agreements').bind(
                    "click", function (event, ui) {
                        widget._loadPaymentMethods();
                    }
                );
            } else {
                $viewForm.find('.acc-billing-agreements').hide();
            }

            Accumulus.localize($viewForm, Accumulus.labels.paymentMethods);
        },

        _addCreditCard: function () {
            var widget = this;
            widget._$viewForm.hide();
            Accumulus.plugins.paymentMethods.editCreditCardView.getContent(function (content) {
                widget._initCreditCardForm();
            });
        },

        _addBankAccount: function () {
            var widget = this;
            widget._$viewForm.hide();
            Accumulus.plugins.paymentMethods.editBankAccountView.getContent(function (content) {
                widget._initBankAccountForm();
            });
        },

        _addBillingAgreement: function () {
            var widget = this;
            widget._createBillingAgreement(function (success, data) {
                if (success) {
                    window.open(data.RedirectUrl, '_blank');
                } else {
                    widget._serverError(data);
                }
            });
        },

        _editCreditCard: function (creditCard) {
            var widget = this;
            widget._creditCard = creditCard;
            widget._$viewForm.hide();
            Accumulus.plugins.paymentMethods.editCreditCardView.getContent(function (content) {
                widget._initCreditCardForm();
                widget._$detailsContainer.find('.acc-cvv-field').hide();
                widget._fillCreditCardForm();
            });
        },

        _editBankAccount: function (bankAccount) {
            var widget = this;
            widget._bankAccount = bankAccount;
            widget._$viewForm.hide();
            Accumulus.plugins.paymentMethods.editBankAccountView.getContent(function (content) {
                widget._initBankAccountForm();
                widget._fillBankAccountForm();
            });
        },

        _initCreditCardForm: function () {
            var widget = this;
            var $container = this.element;
            var currentYear = (new Date()).getFullYear();
            var gLabels = Accumulus.labels.general;

            $container.append(Accumulus.plugins.paymentMethods.editCreditCardView.content);

            var $detailsContainer = $container.find('.acc-credit-card-edit-view');
            var $editForm = $detailsContainer.find('.acc-credit-card-edit-form');
            var $yearSelect = $detailsContainer.find('[name="year"]');

            widget._$detailsContainer = $detailsContainer;

            Accumulus.localize($detailsContainer, Accumulus.labels.paymentMethods);

            var mastercardImg = $detailsContainer.find('.acc-card-mastercard-img');
            var visaImg = $detailsContainer.find('.acc-card-visa-img');
            var discoverImg = $detailsContainer.find('.acc-card-discover-img');
            var amexImg = $detailsContainer.find('.acc-card-amex-img');
            mastercardImg.attr('src', Accumulus.images.MC);
            visaImg.attr('src', Accumulus.images.VISA);
            discoverImg.attr('src', Accumulus.images.DISC);
            amexImg.attr('src', Accumulus.images.AMEX);

            $detailsContainer.find('.acc-cvv-img')
                .attr('src', Accumulus.images.CVV);

            $detailsContainer.find('.acc-cancel').bind("click", function (event, ui) {
                widget._creditCard = null;
                widget._cancel();
            });

            for (var year = 2005; year <= 2099; year++) {
                var twoDigitsYear = year.toString().substring(2);
                $yearSelect.append(new Option(year, twoDigitsYear));
            }

            $yearSelect.val(currentYear.toString().substring(2));

            var creditCard = widget._creditCard;
            Accumulus.hookUpStateAndCountry(
                widget,
                $detailsContainer.find('[name="state"]'),
                creditCard && (creditCard.StateProvinceCode || creditCard.StateProvince),
                $detailsContainer.find('[name="country"]'),
                creditCard && creditCard.CountryCode);

            $editForm.validate({
                submitHandler: function (form) {
                    widget._saveCreditCard();
                },
                rules: {
                    name: { required: true },
                    number: {
                        required: true,
                        creditcard: true
                    },
                    month: { required: true },
                    year: { required: true },
                    postalCode: { required: true }
                },
                messages: {
                    name: gLabels['nameRequired'] || 'Name Required',
                    number: {
                        required: gLabels['cardNumberRequired'] || 'Card Number Required',
                        creditcard: gLabels['creditcard'] || 'Incorrect Card Number'
                    },
                    month: gLabels['expirationDate'] || 'Expiration Date Required',
                    year: gLabels['expirationDate'] || 'Expiration Date Required',
                    postalCode: gLabels['postalCodeRequired'] || 'Postal Code Required'
                },
                errorPlacement: widget._validationErrorPlacement
            });

            if (!widget.options.showBillingAddress) {
                $detailsContainer.find('.acc-billing-address').hide();
            }
        },

        _initBankAccountForm: function () {
            var widget = this;
            var $container = this.element;
            var gLabels = Accumulus.labels.general;

            $container.append(Accumulus.plugins.paymentMethods.editBankAccountView.content);

            var $detailsContainer = $container.find('.acc-bank-account-edit-view');
            var $editForm = $detailsContainer.find('.acc-bank-account-edit-form');

            widget._$detailsContainer = $detailsContainer;

            Accumulus.localize($detailsContainer, Accumulus.labels.paymentMethods);

            $detailsContainer.find('.acc-cancel').bind("click", function (event, ui) {
                widget._bankAccount = null;
                widget._cancel();
            });

            var bankAccount = widget._bankAccount;
            Accumulus.hookUpStateAndCountry(
                widget,
                $detailsContainer.find('[name="state"]'),
                bankAccount && (bankAccount.StateProvinceCode || bankAccount.StateProvince),
                $detailsContainer.find('[name="country"]'),
                bankAccount && bankAccount.CountryCode);

            $editForm.validate({
                submitHandler: function (form) {
                    widget._saveBankAccount();
                },
                rules: {
                    type: { required: true },
                    bankName: { required: true },
                    routingNumber: { required: true },
                    accountNumber: { required: true },
                    name: { required: true },
                    country: { required: true }
                },
                messages: {
                    type: gLabels['typeRequired'] || 'Type required',
                    bankName: gLabels['bankNameRequired'] || 'Bank name required',
                    routingNumber: gLabels['routingNumberRequired'] || 'Routing number required',
                    accountNumber: gLabels['accountNumberRequired'] || 'Account number required',
                    name: gLabels['nameRequired'] || 'Name required',
                    country: gLabels['countryRequired'] || 'Country required'
                },
                errorPlacement: widget._validationErrorPlacement
            });
        },

        _fillCreditCardForm: function () {
            var widget = this;
            var cc = widget._creditCard;
            var $detailsContainer = this._$detailsContainer;

            var number = cc.AccountNumber || '';
            var name = cc.FirstName + " " + cc.LastName;
            //var cvv = cc.CVCode || '';

            var company = cc.Company || '';
            var address1 = cc.AddressLine1 || '';
            var address2 = cc.AddressLine2 || '';
            var city = cc.City || '';
            var state = cc.StateProvinceCode || cc.StateProvince || '';
            var postalCode = cc.PostalCode || '';
            var country = cc.CountryCode || Accumulus.global.defaultCountryCode;
            var month = '';
            var year = '';
            try {
                var month = (cc.ExpirationDate) ? cc.ExpirationDate.substring(0, 2) : '';
                var year = (cc.ExpirationDate) ? cc.ExpirationDate.substring(2) : '';
            } catch (e) {
                Accumulus.error('Credit Card expiration date not correct.');
            }
            $detailsContainer.find('[name="name"]').val(name);
            $detailsContainer.find('[name="month"]').val(month);
            $detailsContainer.find('[name="year"]').val(year);
            $detailsContainer.find('[name="number"]').val(number);

            $detailsContainer.find('[name="company"]').val(company);
            $detailsContainer.find('[name="address1"]').val(address1);
            $detailsContainer.find('[name="address2"]').val(address2);
            $detailsContainer.find('[name="city"]').val(city);
            $detailsContainer.find('[name="postalCode"]').val(postalCode);
        },

        _fillBankAccountForm: function () {
            var widget = this;
            var ba = widget._bankAccount;
            var $detailsContainer = this._$detailsContainer;

            var type = ba.AccountType;
            var bankName = ba.BankName || '';
            var routingNumber = ba.RoutingNumber || '';
            var accountNumber = ba.AccountNumber || '';
            var name = ba.FirstName + " " + ba.LastName;

            var company = ba.Company || '';
            var address1 = ba.AddressLine1 || '';
            var address2 = ba.AddressLine2 || '';
            var city = ba.City || '';
            var state = ba.StateProvinceCode || ba.StateProvince || '';
            var postalCode = ba.PostalCode || '';
            var country = ba.CountryCode || Accumulus.global.defaultCountryCode;

            $detailsContainer.find('[name="type"]').val(type);
            $detailsContainer.find('[name="bankName"]').val(bankName);
            $detailsContainer.find('[name="routingNumber"]').val(routingNumber);
            $detailsContainer.find('[name="accountNumber"]').val(accountNumber);
            $detailsContainer.find('[name="name"]').val(name);

            $detailsContainer.find('[name="company"]').val(company);
            $detailsContainer.find('[name="address1"]').val(address1);
            $detailsContainer.find('[name="address2"]').val(address2);
            $detailsContainer.find('[name="city"]').val(city);
            $detailsContainer.find('[name="postalCode"]').val(postalCode);
        },

        _saveCreditCard: function () {
            var widget = this;

            if (widget._creditCard == null) {
                this._createCreditCard(function (success, data) {
                    if (success) {
                        widget._$detailsContainer.remove();
                        //widget._reloadCreditCards();
                        widget._loadPaymentMethods();
                        widget._$viewForm.show();
                    } else {
                        widget._serverError(data);
                    }
                });
            } else {
                this._updateCreditCard(function (success, data) {
                    if (success) {
                        widget._creditCard = null;
                        widget._$detailsContainer.remove();
                        widget._reloadCreditCards();
                        widget._$viewForm.show();
                    } else {
                        widget._serverError(data);
                    }
                });
            }

        },

        _saveBankAccount: function () {
            var widget = this;

            if (widget._bankAccount == null) {
                this._createBankAccount(function (success, data) {
                    if (success) {
                        widget._$detailsContainer.remove();
                        //widget._reloadBankAccounts();
                        widget._loadPaymentMethods();
                        widget._$viewForm.show();
                    } else {
                        widget._serverError(data);
                    }
                });
            } else {
                this._updateBankAccount(function (success, data) {
                    if (success) {
                        widget._bankAccount = null;
                        widget._$detailsContainer.remove();
                        widget._reloadBankAccounts();
                        widget._$viewForm.show();
                    } else {
                        widget._serverError(data);
                    }
                });
            }

        },

        _createCreditCard: function (callback) {
            Accumulus.info('Submitting new credit card info...');
            var widget = this;
            var $detailsContainer = widget._$detailsContainer;

            var url = Accumulus.serviceUrl + '/CreatePaymentMethod';

            var cardNumber = $detailsContainer.find('[name="number"]').val();
            var expirationDate = $detailsContainer.find('[name="month"]').val()
                + $detailsContainer.find('[name="year"]').val();

            var json = {
                cc: {
                    name: $detailsContainer.find('[name="name"]').val(),
                    number: cardNumber,
                    exp: expirationDate,
                    cvv: $detailsContainer.find('[name="cvv"]').val(),

                    company: $detailsContainer.find('[name="company"]').val(),
                    addr1: $detailsContainer.find('[name="address1"]').val(),
                    addr2: $detailsContainer.find('[name="address2"]').val(),
                    postal: $detailsContainer.find('[name="postalCode"]').val(),
                    state: $detailsContainer.find('[name="state"]').val(),
                    city: $detailsContainer.find('[name="city"]').val(),
                    country: $detailsContainer.find('[name="country"]').val()
                }
            }

            $.extend(json, widget._accessInfo);

            Accumulus.API.jsonpCall(url, json, callback);
        },

        _createBankAccount: function (callback) {
            Accumulus.info('Submitting new bank account info...');
            var widget = this;
            var $detailsContainer = widget._$detailsContainer;

            var url = Accumulus.serviceUrl + '/CreatePaymentMethod';

            var ba = widget._bankAccount;

            var json = {
                ba: {
                    number: $detailsContainer.find('[name="accountNumber"]').val(),
                    type: $detailsContainer.find('[name="type"]').val(),
                    route: $detailsContainer.find('[name="routingNumber"]').val(),
                    bank: $detailsContainer.find('[name="bankName"]').val(),
                    name: $detailsContainer.find('[name="name"]').val(),

                    company: $detailsContainer.find('[name="company"]').val(),
                    addr1: $detailsContainer.find('[name="address1"]').val(),
                    addr2: $detailsContainer.find('[name="address2"]').val(),
                    postal: $detailsContainer.find('[name="postalCode"]').val(),
                    state: $detailsContainer.find('[name="state"]').val(),
                    city: $detailsContainer.find('[name="city"]').val(),
                    country: $detailsContainer.find('[name="country"]').val()
                }
            }

            $.extend(json, widget._accessInfo);

            Accumulus.API.jsonpCall(url, json, callback);
        },

        _createBillingAgreement: function (callback) {
            Accumulus.info('Submitting billing agreement info...');
            var widget = this;
            var url = Accumulus.serviceUrl + '/CreatePaymentMethod';

            //TODO: Remove name & email when they're added through the backend.
            var json = {
                pp: {
                    name: "Customer Name",
                    email: "noreply@accumulus.com",
                    confirmUrl: widget.options.confirmUrl,
                    cancelUrl: widget.options.cancelUrl
                }
            };

            $.extend(json, widget._accessInfo);

            Accumulus.API.jsonpCall(url, json, callback);
        },

        _updateCreditCard: function (callback) {
            Accumulus.info('Submitting credit card info...');
            var widget = this;
            var $detailsContainer = widget._$detailsContainer;

            var cc = widget._creditCard;
            var url = Accumulus.serviceUrl + '/UpdatePaymentMethod';

            var cardNumber = $detailsContainer.find('[name="number"]').val();
            var expirationDate = $detailsContainer.find('[name="month"]').val()
                + $detailsContainer.find('[name="year"]').val();

            var json = {
                cc: {
                    key: cc.PaymentMethodKey,
                    name: $detailsContainer.find('[name="name"]').val(),
                    number: cardNumber,
                    exp: expirationDate,

                    company: $detailsContainer.find('[name="company"]').val(),
                    addr1: $detailsContainer.find('[name="address1"]').val(),
                    addr2: $detailsContainer.find('[name="address2"]').val(),
                    postal: $detailsContainer.find('[name="postalCode"]').val(),
                    state: $detailsContainer.find('[name="state"]').val(),
                    city: $detailsContainer.find('[name="city"]').val(),
                    country: $detailsContainer.find('[name="country"]').val()
                }
            }

            $.extend(json, widget._accessInfo);

            Accumulus.API.jsonpCall(url, json, callback);
        },

        _updateBankAccount: function (callback) {
            Accumulus.info('Submitting bank account info...');
            var widget = this;
            var $detailsContainer = widget._$detailsContainer;

            var url = Accumulus.serviceUrl + '/UpdatePaymentMethod';

            var ba = widget._bankAccount;

            var json = {
                ba: {
                    key: ba.PaymentMethodKey,
                    number: $detailsContainer.find('[name="accountNumber"]').val(),
                    type: $detailsContainer.find('[name="type"]').val(),
                    route: $detailsContainer.find('[name="routingNumber"]').val(),
                    bank: $detailsContainer.find('[name="bankName"]').val(),
                    name: $detailsContainer.find('[name="name"]').val(),

                    company: $detailsContainer.find('[name="company"]').val(),
                    addr1: $detailsContainer.find('[name="address1"]').val(),
                    addr2: $detailsContainer.find('[name="address2"]').val(),
                    postal: $detailsContainer.find('[name="postalCode"]').val(),
                    state: $detailsContainer.find('[name="state"]').val(),
                    city: $detailsContainer.find('[name="city"]').val(),
                    country: $detailsContainer.find('[name="country"]').val()
                }
            }

            $.extend(json, widget._accessInfo);

            Accumulus.API.jsonpCall(url, json, callback);
        },

        _reloadCreditCards: function () {
            var widget = this;
            widget._fetchPaymentMethods(function (success, data) {
                if (success) {
                    widget._defaultPaymentMethodKey = data.CurrentPaymentMethodKey;
                    widget._creditCards = data.CreditCards;
                    widget._fillCreditCards();
                } else {
                    widget._serverError(data);
                }
            });
        },

        _reloadBankAccounts: function () {
            var widget = this;
            widget._fetchPaymentMethods(function (success, data) {
                if (success) {
                    widget._defaultPaymentMethodKey = data.CurrentPaymentMethodKey;
                    widget._bankAccounts = data.BankAccounts;
                    widget._fillBankAccounts();
                } else {
                    widget._serverError(data);
                }
            });
        },

        _reloadBillingAgreements: function () {
            var widget = this;
            widget._fetchPaymentMethods(function (success, data) {
                if (success) {
                    widget._defaultPaymentMethodKey = data.CurrentPaymentMethodKey;
                    widget._billingAgreements = data.BillingAgreements;
                    widget._fillBillingAgreements();
                } else {
                    widget._serverError(data);
                }
            });
        },

        _fillPaymentMethodsView: function () {
            var widget = this;
            widget._fillCreditCards();
            widget._fillBankAccounts();
            widget._fillBillingAgreements();
        },

        _fillCreditCards: function () {
            var widget = this;
            var $viewForm = widget._$viewForm;
            var $container = $viewForm.find('.acc-credit-cards-list');
            $container.empty();

            var creditCards = widget._creditCards;

            if (creditCards && creditCards.length > 0) {

                for (var i in creditCards) {

                    var cc = creditCards[i];

                    var $div = $('<div></div>');
                    $container.append($div);

                    $div.data('cc', cc).load(
                        Accumulus.plugins.paymentMethods.creditCardItemView.path, //TODO: review
                        function () {
                            var $this = $(this);
                            var cc = $this.data('cc');

                            var key = cc.PaymentMethodKey;
                            if (key == widget._defaultPaymentMethodKey) {
                                $this.find('.acc-default-payment-method').addClass('ui-disabled');
                                $this.find('.acc-default-payment-method-img')
                                    .attr('title', Accumulus.labels.paymentMethods.defaultPaymentMethod)
                                    .attr('src', Accumulus.resourcesUrl + 'images/check-black.png').show();
                            }

                            var type = cc.Type || '';
                            if (Accumulus.images[type]) {
                                $this.find('.acc-card-type-img').attr('src', Accumulus.images[type]);
                            } else {
                                $this.find('.acc-card-type-img').attr('src', Accumulus.resourcesUrl + widget.images.DEFAULT);
                            }

                            var accountNumber = cc.AccountNumber || '';
                            var firstName = cc.FirstName || '';
                            var lastName = cc.LastName || '';

                            var company = cc.Company || '';
                            var addressLine1 = cc.AddressLine1 || '';
                            var addressLine2 = cc.AddressLine2 || '';
                            var city = cc.City || '';
                            var state = cc.StateProvince || '';
                            var postalCode = cc.PostalCode || '';

                            //TODO: Modify this when the Countries form gets refactored to a JSon structure.
                            var countryOptions = Accumulus.getAllCountries();
                            var html = $.parseHTML(countryOptions);
                            var country = $('<div></div>').html(html).find('option[value="' + cc.CountryCode + '"]').text();

                            var expDate = cc.ExpirationDate || '';
                            var expDateMonth = '';
                            var expDateYear = '';

                            if (accountNumber.length == 16) {
                                accountNumber = accountNumber.substr(12);
                            }

                            if (expDate.length == 4) {
                                expDateMonth = expDate.substr(0, 2);
                                expDateYear = expDate.substr(2);
                            }

                            //$this.find('[name="acc-card-type"]').text(type);
                            $this.find('.acc-card-name').text(firstName + ' ' + lastName);
                            $this.find('.acc-card-number').text(accountNumber);
                            $this.find('.acc-exp-date').text(expDateMonth + '/' + '20' + expDateYear);

                            $this.find('.acc-company').text(company);
                            $this.find('.acc-address1').text(addressLine1);
                            $this.find('.acc-address2').text(addressLine2);
                            $this.find('.acc-city').text(city);
                            $this.find('.acc-state').text(state);
                            $this.find('.acc-postal-code').text(postalCode);
                            $this.find('.acc-country').text(country);

                            $this.find('.acc-edit-credit-card').bind(
                                "click", function (event, ui) {
                                    widget._editCreditCard(cc);
                                }
                            );

                            $this.find('.acc-delete-credit-card').bind(
                                "click", function (event, ui) {
                                    Accumulus.API.yesNoPrompt(
                                        Accumulus.labels.general['areYouSure?'],
                                        Accumulus.labels.paymentMethods.confirmDeleteCC,
                                        Accumulus.labels.general.yes,
                                        Accumulus.labels.general.no,
                                        function (selection) {
                                            if (selection) {
                                                widget._deletePaymentMethod(
                                                    'cc', key,
                                                    function (success, data) {
                                                        if (success) {
                                                            if (key == widget._defaultPaymentMethodKey) {
                                                                widget._loadPaymentMethods();
                                                            } else { widget._reloadCreditCards(); }
                                                        } else {
                                                            widget._serverError(data);
                                                        }
                                                    }
                                                );
                                            }
                                        });
                                }
                            );

                            $this.find('.acc-default-payment-method').bind(
                                "click", function (event, ui) {
                                    widget._setAsDefault(key);
                                }
                            );

                            if (!widget.options.showBillingAddress) {
                                $this.find('.acc-billing-address').hide();
                            }

                            Accumulus.localize($this, Accumulus.labels.paymentMethods);
                            widget._enhanceCCItem(this);
                        }
                    );
                }
            } else {
                $viewForm.find('.acc-expires-title').hide();
                //TODO:review that this works correctly
                $container.addClass('list-item-padding')
                    .text(Accumulus.labels.paymentMethods.noCreditCards);
            }
        },

        _fillBankAccounts: function () {
            var widget = this;
            var $viewForm = widget._$viewForm;
            var backAccounts = widget._bankAccounts;
            var $container = $viewForm.find('.acc-bank-accounts-list');
            $container.empty();

            if (backAccounts && backAccounts.length > 0) {
                for (var i in backAccounts) {
                    var ba = backAccounts[i];
                    var $div = $('<div></div>');
                    $container.append($div);

                    $div.data('ba', ba).load(
                            //Accumulus.resourcesUrl + 'forms/' + Accumulus.layout + Accumulus.plugin.paymentMethods.forms.bankAccountItem.path,
                        Accumulus.plugins.paymentMethods.bankAccountItemView.path, //TODO: review
                        function () {
                            var $this = $(this);
                            var ba = $this.data('ba');

                            $this.find('.acc-bank-account-img')
                                .attr('src', Accumulus.images.BA);

                            var key = ba.PaymentMethodKey;
                            if (key == widget._defaultPaymentMethodKey) {
                                $this.find('.acc-default-payment-method').addClass('ui-disabled');
                                $this.find('.acc-default-payment-method-img')
                                    .attr('title', Accumulus.labels.paymentMethods.defaultPaymentMethod)
                                    .attr('src', Accumulus.resourcesUrl + 'images/check-black.png').show();
                            }

                            var accountNumber = ba.AccountNumber || '';
                            var type = ba.AccountType || '';
                            try {
                                type = Accumulus.labels.paymentMethods[type];
                            } catch (e) { accumulus.info(e.message) }

                            var key = ba.PaymentMethodKey;
                            var firstName = ba.FirstName || '';
                            var lastName = ba.LastName || '';
                            var bankName = ba.BankName || '';
                            var routingNumber = ba.RoutingNumber || '';

                            var company = ba.Company || '';
                            var addressLine1 = ba.AddressLine1 || '';
                            var addressLine2 = ba.AddressLine2 || '';
                            var city = ba.City || '';
                            var state = ba.StateProvince || '';
                            var postalCode = ba.PostalCode || '';

                            //TODO: Modify this when the Countries form gets refactored to a JSon structure.
                            var countryOptions = Accumulus.getAllCountries();
                            var html = $.parseHTML(countryOptions);
                            var country = $('<div></div>').html(html).find('option[value="' + ba.CountryCode + '"]').text();

                            $this.find('.acc-bank-name').text(bankName);
                            $this.find('.acc-bank-account-number').text(accountNumber);
                            $this.find('.acc-bank-account-name').text(firstName + " " + lastName);
                            $this.find('.acc-bank-account-type').text(type);
                            $this.find('.acc-bank-routing-number').text(routingNumber);

                            $this.find('.acc-company').text(company);
                            $this.find('.acc-address1').text(addressLine1);
                            $this.find('.acc-address2').text(addressLine2);
                            $this.find('.acc-city').text(city);
                            $this.find('.acc-state').text(state);
                            $this.find('.acc-postal-code').text(postalCode);
                            $this.find('.acc-country').text(country);

                            $this.find('.acc-edit-bank-account').bind(
                                "click", function (event, ui) {
                                    widget._editBankAccount(ba);
                                }
                            );

                            $this.find('.acc-delete-bank-account').bind(
                                "click", function (event, ui) {
                                    Accumulus.API.yesNoPrompt(
                                        Accumulus.labels.general['areYouSure?'],
                                        Accumulus.labels.paymentMethods.confirmDeleteBA,
                                        Accumulus.labels.general.yes,
                                        Accumulus.labels.general.no,
                                        function (selection) {
                                            if (selection) {
                                                widget._deletePaymentMethod(
                                                    'ba', key,
                                                    function (success, data) {
                                                        if (success) {
                                                            if (key == widget._defaultPaymentMethodKey) {
                                                                widget._loadPaymentMethods();
                                                            } else {
                                                                widget._reloadBankAccounts();
                                                            }
                                                        } else {
                                                            widget._serverError(data);
                                                        }
                                                    }
                                                );
                                            }
                                        });
                                }
                            );

                            $this.find('.acc-default-payment-method').bind(
                                "click", function (event, ui) {
                                    widget._setAsDefault(key);
                                }
                            );

                            Accumulus.localize($this, Accumulus.labels.paymentMethods);
                            widget._enhanceBAItem(this);
                        }
                    );
                }
            } else {
                $container.addClass('list-item-padding')
                    .text(Accumulus.labels.paymentMethods.noBankAccounts);
            }
        },

        _fillBillingAgreements: function () {
            var widget = this;
            var $viewForm = widget._$viewForm;
            var billingAgreements = widget._billingAgreements;
            var $container = $viewForm.find('.acc-billing-agreements-list');
            $container.empty();

            if (billingAgreements && billingAgreements.length > 0) {

                for (var i in billingAgreements) {

                    var ba = billingAgreements[i];

                    var $div = $('<div></div>');
                    $container.append($div);

                    $div.data('ba', ba).load(
                        Accumulus.plugins.paymentMethods.billingAgreementItemView.path, //TODO: review
                        function () {
                            var $this = $(this);
                            var ba = $this.data('ba');

                            var baTypeImg = Accumulus.images.PP;

                            $this.find('.acc-billing-agreement-img')
                                .attr('src', baTypeImg);

                            var key = ba.PaymentMethodKey;

                            if (key == widget._defaultPaymentMethodKey) {
                                $this.find('.acc-default-payment-method').addClass('ui-disabled');
                                $this.find('.acc-default-payment-method-img')
                                    .attr('title', Accumulus.labels.paymentMethods.defaultPaymentMethod)
                                    .attr('src', Accumulus.resourcesUrl + 'images/check-black.png').show();
                            }

                            var firstName = ba.FirstName || '';
                            var lastName = ba.LastName || '';
                            var agreementID = ba.AgreementID || '';
                            var startingDate = ba.StartingDate || '';
                            startingDate = Accumulus.API.helper.formatDate(startingDate);
                            var endingDate = ba.EndingDate || '';
                            endingDate = Accumulus.API.helper.formatDate(endingDate);


                            $this.find('.acc-billing-agreement-id').text(agreementID);
                            $this.find('.acc-billing-agreement-name').text(firstName + " " + lastName);
                            $this.find('.acc-billing-agreement-starting-date').text(startingDate);
                            $this.find('.acc-billing-agreement-ending-date').text(endingDate);

                            $this.find('.acc-billing-agreement-delete').bind(
                                "click", function (event, ui) {
                                    Accumulus.API.yesNoPrompt(
                                        Accumulus.labels.general['areYouSure?'],
                                        Accumulus.labels.paymentMethods['confirmDeletePP'],
                                        Accumulus.labels.general.yes,
                                        Accumulus.labels.general.no,
                                        function (selection) {
                                            if (selection) {
                                                widget._deletePaymentMethod(
                                                    'pp', key,
                                                    function (success, data) {
                                                        if (success) {
                                                            if (key == widget._defaultPaymentMethodKey) {
                                                                widget._loadPaymentMethods();
                                                            } else { widget._reloadBillingAgreements(); }
                                                        } else {
                                                            widget._serverError(data);
                                                        }
                                                    }
                                                );
                                            }
                                        });
                                }
                            );

                            $this.find('.acc-default-payment-method').bind(
                                "click", function (event, ui) {
                                    widget._setAsDefault(key);
                                }
                            );

                            Accumulus.localize($this, Accumulus.labels.paymentMethods);
                            widget._enhancePPItem(this);
                        }
                    );
                }
            } else {
                $container.addClass('list-item-padding')
                    .text(Accumulus.labels.paymentMethods.noBillingAgreements);
            }
        },

        _enhanceCCItem: function (item) { },
        _enhanceBAItem: function (item) { },
        _enhancePPItem: function (item) { },

        _setAsDefault: function (key) {
            Accumulus.info('Submitting default payment method...');

            var widget = this;
            var url = Accumulus.serviceUrl + '/UpdatePaymentMethodSequence';
            var json = widget._accessInfo;
            var sequence = key;

            var creditCards = widget._creditCards;
            var bankAccounts = widget._bankAccounts;
            var billingAgreements = widget._billingAgreements;

            for (var i in creditCards) {
                var ccKey = creditCards[i].PaymentMethodKey;
                if (ccKey != key) {
                    sequence += ',' + ccKey;
                }
            }

            for (var i in bankAccounts) {
                var baKey = bankAccounts[i].PaymentMethodKey;
                if (baKey != key) {
                    sequence += ',' + baKey;
                }
            }

            for (var i in billingAgreements) {
                var ppKey = billingAgreements[i].PaymentMethodKey;
                if (ppKey != key) {
                    sequence += ',' + ppKey;
                }
            }

            json.sequence = sequence;

            Accumulus.API.jsonpCall(url, json, function (success, data) {
                if (success) {
                    widget._loadPaymentMethods();
                } else {
                    widget._serverError(data);
                }
            });
        },

        _deletePaymentMethod: function (type, key, callback) {
            var widget = this;
            var url = Accumulus.serviceUrl + "/DeletePaymentMethod";
            var data = widget._accessInfo;
            var json = {};
            json[type] = { key: key };
            $.extend(json, data);
            Accumulus.info("Deleting payment method info...");
            Accumulus.API.jsonpCall(url, json, callback);
        },

        _cancel: function () {
            this._creditCard = null;
            this._bankAccount = null;
            this._billingAgreement = null;
            this._$detailsContainer.remove();
            this._$viewForm.show();
        }
    });

    $.widget("accumulus.usageBalances", $.accumulus.portalPlugin, {
        options: {
            formatQuantityHandler: null
        },

        _balancesView: null,
        _$viewForm: null,
        _usageBalances: null,

        _initPlugin: function () {
            var widget = this;
            widget._balancesView = Accumulus.plugins.usageBalances.balancesView;
            widget._balancesView.getContent(function (content) {
                widget._loadUsageBalances();
            });
        },

        _loadUsageBalances: function () {
            var widget = this;
            widget._fetchUsageBalances(function (success, data) {
                if (success) {
                    widget._usageBalances = data.UsageBalances;
                    widget._initViewForm();
                    widget._fillViewForm();
                } else {
                    widget._serverError(data);
                }
            });
        },

        _fetchUsageBalances: function (callback) {
            Accumulus.info("Loading usages info from server...");
            var url = Accumulus.serviceUrl + "/GetUsageBalances";
            Accumulus.API.jsonpCall(url, this._accessInfo, callback);
        },

        _initViewForm: function () {
            var widget = this;
            var $container = this.element;
            $container.empty().append(widget._balancesView.content);

            var $viewForm = $container.find('.acc-usage-balances-view');
            widget._$viewForm = $viewForm;

            if (!widget.options.showHeader) {
                $container.find('.acc-widget-title').hide();
            }

            Accumulus.localize($viewForm, Accumulus.labels.usageBalances);
        },

        _fillViewForm: function () { }
    });

    $.widget("accumulus.usageHistory", $.accumulus.portalPlugin, {
        options: {
            skip: 0,
            take: 10,
            fromDateTime: ""
        },

        _usageHistoryView: null,
        _usageDetailsView: null,

        _totalUsages: null,
        _$viewForm: null,
        _$detailsContainer: null,
        _usages: {},
        _usage: null,
        _currentPage: null,
        _nextBtn: null,
        _previousBtn: null,

        _initPlugin: function () {
            var widget = this;
            widget._usageHistoryView = Accumulus.plugins.usageHistory.usageHistoryView;
            widget._usageHistoryView.getContent(function (content) {
                widget._loadUsages();
            });
        },

        _loadUsages: function () {
            var widget = this;
            widget._fetchUsages(function (success, data) {
                if (success) {
                    widget._currentPage = 1;
                    widget._usages[widget._currentPage] = data.Usages;
                    widget._totalUsages = data.TotalItemCount;
                    widget._initViewForm();
                    widget._fillViewForm();
                } else {
                    widget._serverError(data);
                }
            });
        },

        _fetchUsages: function (callback) {
            Accumulus.info("Loading usages info from server...");
            var widget = this;
            var url = Accumulus.serviceUrl + "/GetUsages";
            var data = widget._accessInfo;
            var json = {
                skip: widget.options.skip,
                take: widget.options.take,
                fromDateTime: widget.options.fromDateTime
            };
            $.extend(json, data);
            Accumulus.API.jsonpCall(url, json, callback);
        },

        _initViewForm: function () {
            var widget = this;
            var $container = this.element;
            $container.empty();

            var currentPage = widget._currentPage;
            var itemsByPage = widget.options.take;
            var totalItems = widget._totalUsages;

            $container.append(widget._usageHistoryView.content);

            var $viewForm = $container.find('.acc-usage-history-view');
            widget._$viewForm = $viewForm;

            if (!widget.options.showHeader) {
                $container.find('.acc-widget-title').hide();
            }

            Accumulus.localize($viewForm, Accumulus.labels.usageHistory);

            widget._nextBtn = $viewForm.find('.acc-next');
            widget._previousBtn = $viewForm.find('.acc-previous');

            $(widget._nextBtn).button();

            $(widget._previousBtn).button();

            $(widget._nextBtn).click(
                function (event, ui) {
                    widget._next();
                }
            )

            $(widget._previousBtn).click(
                function (event, ui) {
                    widget._previous();
                }
            )

            widget._disablePrevious();
            if ((currentPage * itemsByPage) >= totalItems) {
                widget._disableNext();
            };
        },

        _next: function () {
            var widget = this;
            var itemsByPage = widget.options.take;
            widget.options.skip = widget._currentPage * itemsByPage;
            var currentPage = ++widget._currentPage;
            var totalItems = widget._totalUsages;
            if (!widget._usages[currentPage]) {
                widget._fetchUsages(function (success, data) {
                    if (success) {
                        widget._usages[currentPage] = data.Usages;
                        widget._fillViewForm();
                    } else {
                        widget._serverError(data);
                        return;
                    }
                });
            } else {
                widget._fillViewForm();
            }
            if ((currentPage * itemsByPage) >= totalItems) {
                widget._disableNext();
            }
            widget._enablePrevious();
        },

        _previous: function () {
            var widget = this;
            widget._currentPage--;

            if (widget._currentPage == 1) {
                widget._disablePrevious();
            }
            widget._enableNext();

            widget._fillViewForm();
        },

        _disablePrevious: function () {
            $(this._previousBtn).button('disable');
        },

        _enablePrevious: function () {
            $(this._previousBtn).button('enable');
        },

        _disableNext: function () {
            $(this._nextBtn).button('disable');
        },

        _enableNext: function () {
            $(this._nextBtn).button('enable');
        },

        _fillViewForm: function () {
            var widget = this;
            var $container = widget.element;
            var usages = widget._usages[widget._currentPage];
            var $tableBody = widget._$viewForm.find('.acc-usages-list-table tbody');
            $tableBody.empty();

            if (usages && usages.length > 0) {
                for (var i in usages) {

                    var u = usages[i];
                    var date = u.StartDateTime;

                    var typeCode = u.UsageTypeCode;
                    var labelType = null;
                    try {
                        labelType = Accumulus.labels.usageHistory.typeCodes[typeCode];
                    } catch (e) { Accumulus.info(e.msg) };
                    var type = labelType || u.UsageTypeName || '';
                    var quantity = u.Quantity;

                    var date = Accumulus.API.helper.formatDate(date, true);

                    var $tr = $('<tr></tr>');

                    $('<td></td>').append(
                        $('<a></a>').text(date)
                            .data('usage', u)
                            .click(
                            function (event, ui) {
                                widget._usage = $(this).data('usage');
                                widget._details();
                                //widget._details( $(this).data('usage') );
                            }
                        ).attr("href", "#")
                    ).appendTo($tr);

                    $('<td></td>').text(type)
                        .appendTo($tr);

                    $('<td></td>').text(quantity).appendTo($tr);

                    $tableBody.append($tr);
                }
            } else {
                $container.find('.acc-usages-list-table').hide();
                $container.find('.acc-controls').hide();

                var noUsagesLabel = 'No usages';
                try {
                    noUsagesLabel = Accumulus.labels.usageHistory.noUsages;
                } catch (e) {
                    Accumulus.info("There's no label for noUsages defined")
                }
                $('<div></div>').text(noUsagesLabel)
                    .appendTo($container.find('.usage-history-view-content'));
            }
        },

        _details: function () {
            var widget = this;
            widget._$viewForm.hide();
            widget._usageDetailsView = Accumulus.plugins.usageHistory.usageDetailsView;
            widget._usageDetailsView.getContent(function (content) {
                widget._initDetailsForm();
                widget._fillDetailsForm();
            });
        },

        _initDetailsForm: function () {
            var widget = this;
            var $container = this.element;

            $container.append(widget._usageDetailsView.content);

            var $detailsContainer = $container.find('.acc-usage-details-view');

            widget._$detailsContainer = $detailsContainer;

            Accumulus.localize($detailsContainer, Accumulus.labels.usageHistory);

            $detailsContainer.find('.acc-ok').bind("click", function (event, ui) {
                widget._cancel();
            });
        },

        _fillDetailsForm: function () {
            var u = this._usage;
            var $detailsContainer = this._$detailsContainer;
            var startDate = Accumulus.API.helper.formatDate(u.StartDateTime, true);
            var quantity = u.Quantity || '';
            var typeCode = u.UsageTypeCode;
            var usageType = null;

            try {
                usageType = Accumulus.labels.usageHistory.typeCodes[typeCode];
            } catch (e) {
                Accumulus.info(e.msg);
            }

            usageType = usageType || u.UsageTypeName || '';

            var subscriptionID = u.SubscriptionID || '';
            var subscriptionItemID = u.SubscriptionItemID || '';

            $detailsContainer.find('.acc-start-date').text(startDate);
            $detailsContainer.find('.acc-quantity').text(quantity);
            $detailsContainer.find('.acc-usage-type').text(usageType);
            $detailsContainer.find('.acc-subscription-id').text(subscriptionID);
            $detailsContainer.find('.acc-subscription-item-id').text(subscriptionItemID);
        },

        _cancel: function () {
            this._$detailsContainer.remove();
            this._$viewForm.show();
        }
    });

    $.widget("accumulus.makePayment", $.accumulus.portalPlugin, {
        options: {
            paymentMade: null
        },

        _paymentMethods: null,
        _SEPARATOR: ' - ',
        _makePaymentView: null,

        _initPlugin: function () {
            var widget = this;
            widget._makePaymentView = Accumulus.plugins.makePayment.makePaymentView;
            widget._makePaymentView.getContent(function (content) {
                widget._loadPaymentMethods();
            });
        },

        _loadPaymentMethods: function () {
            var widget = this;
            widget._fetchPaymentMethods(function (success, data) {
                if (success) {
                    widget._paymentMethods = data;
                    widget._initMakePaymentView();
                } else {
                    widget._serverError(data);
                }
            });
        },

        _fetchPaymentMethods: function (callback) {
            Accumulus.info("Loading payment methods info from server...");
            var url = Accumulus.serviceUrl + "/GetPaymentMethods";
            Accumulus.API.jsonpCall(url, this._accessInfo, callback);
        },

        _initMakePaymentView: function () {
            var widget = this;
            var A = Accumulus;
            var $container = widget.element;
            $container.empty().append(widget._makePaymentView.content);

            if (!widget.options.showHeader) {
                $container.find('.acc-widget-title').hide();
            }

            var pmSelect = $container.find('.acc-payment-method');
            var paymentMethods = widget._paymentMethods;
            var creditCards = paymentMethods.CreditCards;
            var bankAccounts = paymentMethods.BankAccounts;
            var billingAgreements = paymentMethods.BillingAgreements;

            for (var i in creditCards) {
                var o = widget._createCCOption(creditCards[i]);
                pmSelect.append(o);
            }

            for (var i in bankAccounts) {
                var o = widget._createBAOption(bankAccounts[i]);
                pmSelect.append(o);
            }

            for (var i in billingAgreements) {
                var o = widget._createPPOption(billingAgreements[i]);
                pmSelect.append(o);
            }

            var makePaymentBtn = $container.find('.acc-submit-payment');
            $container.find('.acc-make-payment-form').validate({
                submitHandler: function (form) {
                    makePaymentBtn.attr('disabled', 'disabled');
                    widget._makePayment(function (success, data) {
                        if (success) {
                            if (widget._trigger('paymentMade', null, data) !== false) {
                                widget._paymentApplied();
                            }
                        } else {
                            widget._serverError(data);
                        }
                        makePaymentBtn.removeAttr('disabled');
                    });
                },
                rules: {
                    amount: { required: true }
                },
                messages: {
                    amount: A.labels.makePayment['amountRequired']
                },
                errorPlacement: widget._validationErrorPlacement
            });

            A.localize($container, A.labels.makePayment);

            widget._enhanceView();

            A.API.applyCurrencyFormat($container.find('.acc-payment-amount'));
        },

        _createCCOption: function (cc) {
            var widget = this;
            var number = cc.AccountNumber || '';
            var expDate = '';
            var key = cc.PaymentMethodKey || '';
            var type = cc.Type || '';

            if (type) type += ' ';

            if (number.length == 16) {
                number = number.substr(12);
                var endingInLabel = Accumulus.labels.makePayment['endingIn'];
                if (endingInLabel) {
                    number = endingInLabel + ' ' + number;
                }
            }

            if (cc.ExpirationDate) {
                var expMonth = cc.ExpirationDate.substring(0, 2);
                var expYear = cc.ExpirationDate.substring(2);
                expDate = expMonth + '/' + expYear;
            }

            var o = $('<option></option>');
            return o.val(key).append(type).append(number).append(widget._SEPARATOR).append(expDate);
        },

        _createBAOption: function (ba) {
            var widget = this;
            var bankName = ba.BankName || '';
            var number = ba.AccountNumber || '';
            var key = ba.PaymentMethodKey || '';
            var o = $('<option></option>');
            return o.append(bankName).append(widget._SEPARATOR).append(number).val(key);
        },

        _createPPOption: function (pp) {
            var widget = this;
            var key = pp.PaymentMethodKey || '';
            var issuer = pp.Issuer || '';
            var id = pp.AgreementID || '';
            var o = $('<option></option>');
            return o.append(issuer).append(widget._SEPARATOR).append(id).val(key);
        },

        _makePayment: function (callback) {
            var widget = this;
            var $container = this.element;
            var amount = $container.find('[name="amount"]')
                .asNumber({ region: Accumulus.global.currencyFormat });

            var pmKey = $container.find('[name="paymentMethod"]').val();

            var url = Accumulus.serviceUrl + '/AuthorizeAndCapture';
            var json = { amount: amount, pmk: pmKey };
            $.extend(json, widget._accessInfo);
            Accumulus.API.jsonpCall(url, json, callback);
        },

        _paymentApplied: function () {
            var widget = this;
            var $container = widget.element;
            var paymentAppliedView = Accumulus.plugins.makePayment.paymentAppliedView;
            paymentAppliedView.getContent(function (content) {
                $container.html(content);
                Accumulus.localize($container, Accumulus.labels.makePayment);
            });
        },

        _enhanceView: function () { }
    });

    $.widget("accumulus.portal", $.accumulus.widget, {
        options: {
            showHeader: true,
            headerText: '',
            loginScreen: false,
            showWidgetHeaders: false,
            emptyWidgetAreaUrl: null,
            companyLogoUrl: null,
            forcePasswordChange: true,

            showProfile: true,
            showSubscriptionList: true,
            showStatementHistory: true,
            showBalance: true,
            showUsageHistory: true,
            showUsageBalances: true,
            showPaymentMethods: true,
            showMakePayment: true,

            profile_onCustomerEdit: null,
            profile_onPasswordChange: null,
            profile_showChangePassword: true,
            profile_taxInformationCountries: null,
            profile_vatOnEServices: false,

            subscriptionList_cancelSubscription: true,
            subscriptionList_itemFieldsHandler: null,

            usageHistory_skip: 0,
            usageHistory_take: 10,
            usageHistory_fromDateTime: '',

            usageBalances_formatQuantityHandler: null,

            paymentMethods_showCreditCards: true,
            paymentMethods_showBankAccounts: false,
            paymentMethods_showBillingAgreements: false,
            paymentMethods_confirmUrl: null,
            paymentMethods_cancelUrl: null,

            makePayment_onPaymentMade: null,

            vatOnEServices: false,
            taxInformationCountries: null
        },

        _selectPluginView: null,
        _loginView: null,
        _captchaToken: null,
        _resetSteps: {
            GET_CAPTCHA: "getCaptcha",
            RESET_PASSWORD: "resetPassword"
        },
        _resetNextStep: null,

        _initPlugin: function () {
            var widget = this;
            widget._selectPluginView = Accumulus.plugins.portal.selectWidgetView;
            widget._selectPluginView.getContent(function (content) {
                widget._initView();
            });
        },

        _initView: function () {
            var widget = this;
            var $container = widget.element;

            $container.append(widget._selectPluginView.content);

            Accumulus.localize($container, Accumulus.labels.portal);

            widget._enhanceView();

            var header = $container.find('.acc-portal-header');
            if (widget.options.showHeader) {
                var headerText = widget.options.headerText;
                header.find('.acc-header-logo').attr('src', widget.options.companyLogoUrl);
                header.find('.acc-header-text').text(headerText);
            } else {
                header.remove();
            }

            if (widget.options.loginScreen) {
                $container.find('.acc-widget-list').hide();
                $container.find('.acc-login-form').show();

                $container.find('.acc-forgot-password').bind('click', function () {
                    widget._showResetForm();
                });
                $container.find('.acc-cancel').bind('click', function () {
                    widget._cancel();
                });

                $container.find('.acc-get-captcha').bind('click', function () {
                    widget._resetNextStep = widget._resetSteps.GET_CAPTCHA;
                });
                $container.find('.acc-reset-password').bind('click', function () {
                    widget._resetNextStep = widget._resetSteps.RESET_PASSWORD;
                });
            } else {
                $container.find('.acc-login-form').remove();
                $container.find('.acc-reset-password-form').remove();
                $container.find('.acc-change-password-form').remove();
            }

            var $loginForm = $container.find('.acc-login-form');
            var $resetPasswordForm = $container.find('.acc-reset-password-form');
            var labels = Accumulus.labels.portal;

            $loginForm.validate({
                submitHandler: function (form) {
                    widget._login();
                },
                rules: {
                    username: { required: true },
                    password: { required: true }
                },
                messages: {
                    username: labels['usernameRequired'],
                    password: labels['passwordRequired']
                },
                errorPlacement: widget._validationErrorPlacement
            });

            var resetSteps = widget._resetSteps;

            $resetPasswordForm.validate({
                submitHandler: function (form) {
                    if (widget._resetNextStep == resetSteps.GET_CAPTCHA) {
                        widget._getCaptcha();
                    } else if (widget._resetNextStep == resetSteps.RESET_PASSWORD) {
                        widget._reset();
                    }
                },
                rules: {
                    username: { required: true },
                    captcha: { required: true }
                },
                messages: {
                    username: labels['usernameRequired'],
                    captcha: labels['captchaRequired']
                },
                errorPlacement: widget._validationErrorPlacement
            });
        },

        _enhanceView: function () { },

        _showResetForm: function () {
            $(this.element).find('.acc-reset-password-form').show();
            $(this.element).find('.acc-login-form').hide();
        },

        _cancel: function () {
            $(this.element).find('.acc-reset-password-form').hide();
            $(this.element).find('.acc-login-form').show();
        },

        _login: function () {
            var widget = this;
            var $container = widget.element;
            var $loginForm = $container.find('.acc-login-form');
            var $resetPasswordForm = $container.find('.acc-reset-password-form');
            var $changePasswordForm = $container.find('.acc-change-password-form');
            var $errorContainer = $loginForm.find('.acc-server-error');

            widget._submitLogin(function (success, data) {
                if (success) {
                    widget.options.customerID = data.CustomerID;
                    widget.options.token = data.CustomerPortalToken;
                    widget.options.requestID = data.RequestID;
                    widget.options.timestamp = data.Timestamp;
                    widget.options.currencyCode = data.CurrencyCode;
                    widget._setAccessInfo();
                    Accumulus.global.currencyCode = data.CurrencyCode;
                    Accumulus.global.currencyFormat = data.CultureCode;
                    $errorContainer.hide();
                    if (data.CustomerName != '' && widget.options.showHeader) {
                        widget._showCustomerName(data.CustomerName);
                    }

                    if (data.PasswordChangeNeeded && widget.options.forcePasswordChange) {
                        Accumulus.info('Password needs to be changed.');
                        $loginForm.hide();
                        $changePasswordForm.show();
                        widget._initChangePasswordForm();
                    } else {
                        $loginForm.remove();
                        $resetPasswordForm.remove();
                        $changePasswordForm.remove();
                        $container.find('.acc-widget-list').show();
                        $container.find('.acc-logout').show();
                    }
                } else {
                    widget._serverError(data, $errorContainer);
                }
            });
        },

        _initChangePasswordForm: function () {//222
            var widget = this;
            var $container = widget.element;
            var gLabels = Accumulus.labels.general;
            var $form = $container.find('.acc-change-password-form');
            $form.find('.acc-cancel').bind('click', function () {
                widget._cancelPasswordChange();
            });
            $form.validate({
                submitHandler: function (form) {
                    widget._changePassword();
                },
                rules: {
                    "new-password-1": {
                        required: true,
                        minlength: 7,
                        oneDigit: true,
                        oneSpecialChar: true
                    },
                    "new-password-2": {
                        required: true,
                        equalTo: '[name="new-password-1"]'
                    }
                },
                messages: {
                    "new-password-1": {
                        required: gLabels['newPasswordRequired'],
                        oneDigit: gLabels['oneDigitRequired'],
                        minlength: gLabels['minSevenCharsLength'],
                        oneSpecialChar: gLabels['oneSpecialChar']
                    },
                    "new-password-2": {
                        required: gLabels['newPasswordRequired'],
                        equalTo: gLabels['equalBothPasswords']
                    }
                },
                errorPlacement: widget._validationErrorPlacement
            });
        },

        _changePassword: function () {
            var widget = this;
            var $container = widget.element;
            var $passwordForm = $container.find('.acc-change-password-form');
            var $errorContainer = $passwordForm.find('.acc-server-error');
            var newPassword1 = $passwordForm.find('[name="new-password-1"]').val();
            widget._updatePassword(
                newPassword1, function (success, data) {
                    if (success) {
                        widget._passwordChanged();
                    } else {
                        widget._serverError(data, $errorContainer);
                    }
                }
            );
        },

        _passwordChanged: function () {
            var $container = this.element;
            $container.find('.acc-login-form').remove();
            $container.find('.acc-reset-password-form').remove();
            $container.find('.acc-change-password-form').remove();
            $container.find('.acc-widget-list').show();
            $container.find('.acc-logout').show();
        },

        _updatePassword: function (newPassword, callback) {
            var url = Accumulus.serviceUrl + '/CustomerChangePassword';
            var data = { cu: { existingPassword: '----', newPassword: newPassword } };//TODO: remove existing password?
            $.extend(data, this._accessInfo);
            Accumulus.API.jsonpCall(url, data, callback);
        },

        _cancelPasswordChange: function () {
            var $container = this.element;
            $container.find('.acc-login-form').show();
            $container.find('.acc-change-password-form').hide();
        },

        _showCustomerName: function () { },

        _submitLogin: function (callback) {
            var widget = this;
            var $container = widget.element;
            var $loginForm = $container.find('.acc-login-form');
            Accumulus.info('Submitting login...');

            var username = $loginForm.find('[name="username"]').val();
            var password = $loginForm.find('[name="password"]').val();
            var url = Accumulus.serviceUrl + '/Login';
            var json = {
                tid: widget.options.tenantID,
                uid: username,
                pwd: password
            };
            Accumulus.API.jsonpCall(url, json, callback);
        },

        _getCaptcha: function () {
            var widget = this;
            var $container = widget.element;
            var $resetPasswordForm = $container.find('.acc-reset-password-form');
            var $errorContainer = $resetPasswordForm.find('.acc-server-error');
            widget._fetchCaptchaImg(function (success, data) {
                if (success) {
                    widget._showCaptcha(data.CaptchaUrl);
                    widget._captchaToken = data.Token;
                } else {
                    widget._serverError(data, $errorContainer);
                }
            });
        },

        _reset: function () {
            var widget = this;
            var $container = widget.element;
            var $resetPasswordForm = $container.find('.acc-reset-password-form');
            var $errorContainer = $resetPasswordForm.find('.acc-server-error');
            widget._submitPasswordReset(function (success, data) {
                if (success) {
                    $errorContainer.empty();
                    $resetPasswordForm.hide();
                    widget._hideCaptcha();
                    $container.find('.acc-login-form').show();
                } else {
                    widget._serverError(data, $errorContainer);
                }
            });
        },

        _showCaptcha: function (captchaURL) { },

        _hideCaptcha: function () { },

        _submitPasswordReset: function (callback) {
            var widget = this;
            var $container = widget.element;
            var $resetPasswordForm = $container.find('.acc-reset-password-form');

            Accumulus.info('Submitting password reset...');

            var username = $resetPasswordForm.find('[name="username"]').val();
            var captcha = $resetPasswordForm.find('[name="captcha"]').val();
            var url = Accumulus.serviceUrl + '/ResetPassword';

            var json = {
                tid: widget.options.tenantID,
                uid: username,
                ctk: widget._captchaToken,
                captcha: captcha
            };
            Accumulus.API.jsonpCall(url, json, callback);
        },

        _fetchCaptchaImg: function (callback) {
            var widget = this;
            var $container = widget.element;
            Accumulus.info('fetching captcha...');
            var $resetPasswordForm = $container.find('.acc-reset-password-form');
            var url = Accumulus.serviceUrl + '/GetCaptcha';
            var json = {
                tid: widget.options.tenantID,
                uid: $resetPasswordForm.find('[name="username"]').val()
            };
            Accumulus.API.jsonpCall(url, json, callback);
        },

        _getWidgetOptions: function () {
            var widget = this;
            return {
                tenantID: widget.options.tenantID,
                token: widget.options.token,
                requestID: widget.options.requestID,
                timestamp: widget.options.timestamp,
                customerID: widget.options.customerID,
                showHeader: widget.options.showWidgetHeaders,
                messages: widget.options.messages,
                serverError: widget.options.serverError
            };
        }
    });

    $.widget("accumulus.signup", $.accumulus.widget, {
        options: {
            creditCardTypes: 'MC,VISA,DISC,AMEX',
            lockEmail: false,
            allowEmptyBankAccountInfo: false,
            showHeader: true,
            offerCode: null,
            currencyCode: null,
            customer: null,
            subscription: null,
            showPrice: false,
            showPromotion: false,
            showCreditCard: true,
            showBankAccount: false,
            showBillingAgreement: false,
            defaultPaymentMethod: Accumulus.constants.CREDIT_CARD,
            confirmUrl: null,
            cancelUrl: null,
            collectCustomer: false,
            showCustomerAddress: true,
            showCustomerPhone: false,
            requireCustomerPhone: false,
            collectPassword: false,
            showSSLBanner: true,
            showAccountBanner: true,
            showTCCheckbox: true,
            showBillingAddress: false,
            vestaTokenService: null,
            descriptionHTML: null,
            termsAndConditionsHTML: null,
            signup: null,
            calculateSignupFees: null,
            validatePromotion: null,
            taxInformationCountries: null,
            vatOnEServices: false
        },

        // HTML templates for the subscription item sections and the custom fields.
        // To be provided in accumulus.ui.js and accumulus.mobile.js.
        _subscriptionItemSectionTemplate: null,
        _customInputFieldTemplate: null,
        _customSelectFieldTemplate: null,

        _signupView: null,
        _creditCard: null,
        _bankAccount: null,

        _selectedPaymentMethod: null,

        _create: function () {
            var widget = this;
/*            if (!widget.options.showBankAccount
                && !widget.options.showCreditCard
                && !widget.options.showBillingAgreement) {
                Accumulus.error('You must select at least one payment option to be shown.');
            } else {*/
                this._super();
//            }
        },

        _initPlugin: function () {
            var widget = this;
            Accumulus.global.currencyCode = widget.options.currencyCode;
            widget._signupView = Accumulus.plugins.signup.signupView;
            widget._signupView.getContent(function (content) {
                widget._initSignupView();
            });
        },

        _initSignupView: function () {
            var widget = this;
            var $container = widget.element;
            $container.html(widget._signupView.content);

            if (widget.options.lockEmail) {
                $container.find('[name="email"]').prop('disabled', true)
            }

            // if tax identifier countries have not been specified and Vat on eServices is true, setup the default VoE configuration
            if (widget.options.vatOnEServices && !widget.options.taxInformationCountries) {
                widget.options.taxInformationCountries = Accumulus.global.vatOnEServicesCountries;
            }

            if (widget.options.allowEmptyBankAccountInfo) {
                var $input = $container.find('#acc-bank-account-allow-empty');
                $input.parent().show();
                $input.change(function (e) {
                    if (this.checked) {
                        $container.find('[name="type"]').prop('disabled', true);
                        $container.find('[name="bankName"]').prop('disabled', true);
                        $container.find('[name="routingNumber"]').prop('disabled', true);
                        $container.find('[name="accountNumber"]').prop('disabled', true);
                        $container.find('[name="bankAccountName"]').prop('disabled', true);
                    } else {
                        $container.find('[name="type"]').prop('disabled', false);
                        $container.find('[name="bankName"]').prop('disabled', false);
                        $container.find('[name="routingNumber"]').prop('disabled', false);
                        $container.find('[name="accountNumber"]').prop('disabled', false);
                        $container.find('[name="bankAccountName"]').prop('disabled', false);
                    }
                });
            }

            if (!widget.options.showHeader) {
                $container.find('.acc-widget-title').hide();
            }

            if (!widget.options.showSSLBanner) {
                $(".acc-ssl-banner").hide();
            }

            if (!widget.options.showAccountBanner) {
                $(".acc-account-banner").hide();
            }

            if (widget.options.showTCCheckbox) {
                $container.find('.acc-tc-checkbox').show();
            } else {
                $container.find('.acc-tc-checkbox').hide();
            }

            //Localize
            Accumulus.localize($container, Accumulus.labels.signup);

            var tcHTML = widget.options.termsAndConditionsHTML;
            if (tcHTML) {
                $container.find('.acc-tc-msg').html(tcHTML);
            }

            //signUpFor
            var descriptionHTML = widget.options.descriptionHTML;
            if (descriptionHTML) {
                var descriptionWrapper = $container.find('.acc-signup-description');
                descriptionWrapper.show();
                descriptionWrapper.append(descriptionHTML);
            }

            widget._enhanceView();

            if (widget.options.collectCustomer) {
                var customer = widget.options.customer;

                Accumulus.hookUpStateAndCountry(
                    widget,
                    $container.find('[name="state"]'),
                    customer && customer.StateProvince,
                    $container.find('[name="country"]'),
                    customer && customer.CountryCode);

                if (!widget.options.showCustomerAddress) {
                    $container.find('.acc-customer-address').hide();
                }
                if (!widget.options.showCustomerPhone) {
                    $container.find('.acc-customer-phone').hide();
                } else {
                    $container.find('#acc-customer-phone').prop('required',widget.options.requireCustomerPhone);
                }
                if (!widget.options.collectPassword) {
                    $container.find('.acc-password-fieldset').hide();
                }
            } else {
                $container.find('.acc-account-information').hide();
                $container.find('.acc-tax-information').hide();
            }

            $container.find('.acc-promotion-form').validate({
                submitHandler: function (form) {
                    widget._applyPromotion();
                },
                rules: {
                    promotion: { required: true }
                },
                messages: {
                    promotion: Accumulus.labels.signup['promoRequired']
                },
                errorPlacement: widget._validationErrorPlacement
            });

            var $popupTC = $('.acc-tc-reminder');
            $popupTC.find('.acc-close').on("click", function () {
                widget._closeModal($popupTC);
            });

            var $popupPM = $('.acc-must-select-payment-method');
            $popupPM.find('.acc-close').on("click", function () {
                widget._closeModal($popupPM);
            });

            widget._initCreditCardSection();
            widget._initBankAccountSection();
            widget._initBillingAgreementSection();

            widget._fillUpForm();

            widget._setOption("showPrice", widget.options.showPrice);
            widget._setOption("showPromotion", widget.options.showPromotion);

            widget._getSubscriptionInfoForSignup();
            //setCollapsibleHandlers
        },

        _getSubscriptionInfoForSignup: function () {
            var widget = this;
            widget._populateCustomer();
            widget._populateSubscription();
            var signup = new Accumulus.Signup(widget.options.tenantID, widget.options.token, widget.options.requestID,
                widget.options.timestamp, widget.options.customer, widget.options.subscription, null);
            var url = Accumulus.serviceUrl + "/GetSubscriptionInfoForSignup";
            var data = signup.toJson();
            Accumulus.API.jsonpCall(url, data, function (success, response) {
                if (success) {
                    widget._mapSubscription(response.SubscriptionInfo);
                    widget._onGetSubscriptionInfoForSignup();
                    widget._applyFormValidation();
                } else {
                    widget._serverError(response);
                }
            });
        },

        _onGetSubscriptionInfoForSignup: function () {
            var subscription = this.options.subscription;
            var $container = this.element.find('.acc-subscription-information');

            for (var i = 0, subscriptionItem; subscriptionItem = subscription.items[i]; i++) {
                if (subscriptionItem.fields == null || subscriptionItem.fields.length == 0) continue;

                var numerOfFieldsShown = 0;
                for (var j = 0, field; field = subscriptionItem.fields[j]; j++) {
                    if (field.hidden) continue;
                    numerOfFieldsShown++;
                }

                if (numerOfFieldsShown == 0) continue;

                var html = Accumulus.format(this._subscriptionItemSectionTemplate, {
                    productName: subscriptionItem.productName,
                });
                $container.append(html);
                var $fieldContainer = $container.find('.acc-subscription-item-form').last();
                for (var j = 0, field; field = subscriptionItem.fields[j]; j++) {
                    if (field.hidden) continue;

                    numerOfFieldsShown++;

                    var $inputOrSelect;
                    if (field.type != Accumulus.CustomFieldType.list) {
                        html = Accumulus.format(this._customInputFieldTemplate, {
                            code: field.code,
                            name: field.name,
                            pattern: field.validationRegEx ? 'pattern="' + field.validationRegEx + '"' : '',
                            required: field.required ? 'required' : ''
                        });
                        $fieldContainer.append(html);
                        $inputOrSelect = $fieldContainer.find('input').last();
                    } else {
                        var labels = Accumulus.labels.signup;
                        var options = [new Option(labels['selectValue'] || 'Please select a value', '')];
                        for (var k = 0, item; item = field.items[k]; k++) {
                            options.push(new Option(item.name, item.code));
                        }
                        html = Accumulus.format(this._customSelectFieldTemplate, {
                            code: field.code,
                            name: field.name,
                            pattern: field.validationRegEx ? 'pattern="' + field.validationRegEx + '"' : '',
                            required: field.required ? 'required' : ''
                        });
                        $fieldContainer.append(html);
                        $inputOrSelect = $fieldContainer.find('select').last().append(options);
                    }
                    if (field.type == Accumulus.CustomFieldType.date && $inputOrSelect.datepicker) {
                        $inputOrSelect.datepicker();
                    }
                    $inputOrSelect.val(field.value || '').on("change", (function (theField) {
                        return function (e) {
                            theField.value = this.value;
                        };
                    })(field));
                }
            }
        },

        _mapSubscription: function (subscriptionInfo) {
            var subscription = this.options.subscription;
            for (var i = 0, subscriptionItemInfo; subscriptionItemInfo = subscriptionInfo.ItemInfos[i]; i++) {
                var subscriptionItem = null;
                for (var ii in subscription.items) {
                    if (subscription.items[ii].productCode == subscriptionItemInfo.ProductCode) {
                        subscriptionItem = subscription.items[ii];
                        break;
                    }
                }
                if (subscriptionItem == null) {
                    subscriptionItem = subscription.createItem();
                    subscriptionItem.productCode = subscriptionItemInfo.ProductCode;
                }
                subscriptionItem.productName = subscriptionItemInfo.ProductName;
                for (var j = 0, fieldInfo; fieldInfo = subscriptionItemInfo.FieldInfos[j]; j++) {
                    var field = null;
                    for (var jj in subscriptionItem.fields) {
                        if (subscriptionItem.fields[jj].code == fieldInfo.ProductFieldCode) {
                            field = subscriptionItem.fields[jj];
                            break;
                        }
                    }
                    if (field == null) {
                        field = subscriptionItem.createField();
                        field.code = fieldInfo.ProductFieldCode;
                    }
                    field.hidden = fieldInfo.DoNotShow;
                    field.name = fieldInfo.Name;
                    field.required = fieldInfo.Required;
                    field.type = fieldInfo.Type;
                    field.validationRegEx = fieldInfo.ValidationRegEx;
                    // Value may be provided the client, so make sure we don't
                    // override it.
                    if (field.value == null) field.value = fieldInfo.DefaultValue;
                    if (field.type == Accumulus.CustomFieldType.number && !field.validationRegEx) {
                        field.validationRegEx = '[-+]?[0-9]*\\.?[0-9]+';
                    }
                    if (fieldInfo.Items) {
                        field.items = [];
                        for (var k = 0, serverItem; serverItem = fieldInfo.Items[k]; k++) {
                            field.items.push({
                                code: serverItem.ProductFieldItemCode,
                                name: serverItem.Name
                            });
                        }
                    }
                }
            }
        },

        _enhanceView: function () { },

        _applyFormValidation: function () {
            var widget = this;
            var $container = widget.element;
            var labels = Accumulus.labels.signup;
            var $signupForm = $container.find('.acc-signup-form');
            $signupForm.on("submit", function (e) {
                e.preventDefault();
            });
            $signupForm.validate({
                submitHandler: function (form) {
                    var $tcCheckbox = $signupForm.find('.acc-tc-checkbox');
                    if (widget.options.showTCCheckbox && $tcCheckbox.prop("checked") != true) {
                        widget._openModal($('.acc-tc-reminder'));
                    } else if (widget._selectedPaymentMethod == null) {
                        widget._openModal($('.acc-must-select-payment-method'));
                    } else {
                        widget._signup();
                    }
                },
                rules: {
                    name: {
                        required: true,
                        minlength: 3
                    },
                    password: {
                        required: true,
                        minlength: 7,
                        oneDigit: true,
                        oneSpecialChar: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    phone: {
                        required: widget.options.requireCustomerPhone,
                        minlength: 4
                    },
                    address: { required: true },
                    postalCode: { required: true },
                    city: { required: true },
                    state: { required: true },
                    country: { required: true },

                    ccNumber: {
                        required: true,
                        creditcard: true
                    },
                    month: { required: true },
                    year: { required: true },
                    cvv: {
                        required: true,
                        minlength: 3,
                        maxlength: 4
                    },
                    ccName: {
                        required: true,
                        minlength: 3
                    },

                    type: { required: true },
                    bankName: { required: true },
                    routingNumber: { required: true },
                    accountNumber: { required: true },
                    bankAccountName: { required: true },
                },

                messages: {
                    name: {
                        required: labels['nameRequired'] || 'Name Required.',
                        minlength: labels['nameMinLength3'] || 'Must have at least 3 characters.'
                    },
                    password: {
                        required: labels['passwordRequired'],
                        oneDigit: labels['oneDigitRequired'],
                        minlength: labels['minSevenCharsLength'],
                        oneSpecialChar: labels['oneSpecialChar']
                    },
                    email: {
                        required: labels['emailRequired'],
                        email: labels['notEmailFormat']
                    },
                    phone: labels['phoneRequired'],
                    address: labels['addressRequired'],
                    postalCode: labels['postalCodeRequired'],
                    city: labels['cityRequired'],
                    state: labels['stateRequired'],
                    country: labels['countryRequired'],

                    ccNumber: {
                        required: labels['cardNumberRequired'] || 'Card Number Required',
                        creditcard: labels['incorrectCardNumber'] || 'Incorrect Card Number'
                    },
                    month: labels['expirationDateRequired'] || 'Expiration Date Required',
                    year: labels['expirationDateRequired'] || 'Expiration Date Required',
                    cvv: {
                        required: labels['cvvRequired'] || 'CVV Required',
                        minlength: labels['cvvMinLength3'] || 'Must have at least 3 caracters.',
                        maxlength: labels['cvvMaxLength4'] || 'Must have a maximum of 4 characters.'
                    },
                    ccName: {
                        required: labels['nameRequired'] || 'Name Required',
                        minlength: labels['nameMinLength3'] || 'Must have at least 3 characters.'
                    },

                    bankName: labels['bankNameRequired'] || 'Bank Name Required',
                    type: labels['typeRequired'] || 'Type Required',
                    routingNumber: labels['routingNumberRequired'] || 'Routing Number Required',
                    accountNumber: labels['accountNumberRequired'] || 'Account Number Required',
                    bankAccountName: labels['nameRequired'] || 'Name Required',
                },

                errorPlacement: widget._validationErrorPlacement
            });
        },

        _signup: function () {
            var widget = this;
            widget._populateCustomer();
            widget._populateSubscription();
            var $container = this.element;

            var $signupBtn = $container.find('.acc-subscribe-submit');
            $signupBtn.attr('disabled', 'disabled');

            if (widget._selectedPaymentMethod == Accumulus.constants.CREDIT_CARD) {
                widget._populateCreditCard();
            } else if (widget._selectedPaymentMethod == Accumulus.constants.BANK_ACCOUNT) {
                widget._populateBankAccount();
            } else if (widget._selectedPaymentMethod == Accumulus.constants.BILLING_AGREEMENT) {
                widget._populateBillingAgreement();
            }

            var customer = widget.options.customer;
            var subscription = widget.options.subscription;
            var creditCard = widget._creditCard;


            var signup = new Accumulus.Signup(widget.options.tenantID,
                widget.options.token,
                widget.options.requestID,
                widget.options.timestamp,
                customer,
                subscription);
                if (widget._selectedPaymentMethod == Accumulus.constants.CREDIT_CARD &&
                    widget.options.showCreditCard) {
                signup.creditCard = widget._creditCard;
            } else if (widget._selectedPaymentMethod == Accumulus.constants.BANK_ACCOUNT) {
                if ($container.find('#acc-bank-account-allow-empty').prop('checked')) {
                    signup.bankAccount = null;
                } else {
                    signup.bankAccount = widget._bankAccount;
                }
            } else if (widget._selectedPaymentMethod == Accumulus.constants.BILLING_AGREEMENT) {
                signup.billingAgreement = widget._billingAgreement;
            }
            widget._createSignup(signup, function (success, data) {
                if (widget._trigger('signup', null, data) !== false) {
                    if (typeof grecaptcha !== 'undefined') {
                        grecaptcha.reset();
                    }
                    $signupBtn.removeAttr('disabled');
                    if (success) {
                        if (widget._selectedPaymentMethod == Accumulus.constants.BILLING_AGREEMENT) {
                            window.open(data.RedirectUrl, '_self');
                        } else {
                            var completionText = widget.options.completionHTML ||
                            Accumulus.labels.signup['completionText'] || 'Done.';
                            $container.find('.acc-signup-view').html(completionText);
                        }
                    } else {
                        widget._serverError(data);
                    }
                }
            });
        },

        _populateCustomer: function () {
            var widget = this;
            var $container = widget.element;
            if (!(widget.options.customer instanceof Accumulus.Customer)) {
                widget.options.customer = new Accumulus.Customer(widget.options.customer);
            }
            var c = widget.options.customer;
            c.CurrencyCode = widget.options.currencyCode;
            if (this.options.collectCustomer) {
                c.Name = $container.find('[name="name"]').val();
                if (this.options.collectPassword) {
                    c.Password = $container.find('[name="password"]').val();
                }
                c.EmailAddress = $container.find('[name="email"]').val();
                if (this.options.showCustomerPhone) {
                    c.HomeNumber = $container.find('[name="phone"]').val();
                }
                if (this.options.showCustomerAddress) {
                    c.Company = $container.find('[name="company"]').val();
                    c.AddressLine1 = $container.find('[name="address"]').val();
                    c.City = $container.find('[name="city"]').val();
                    c.PostalCode = $container.find('[name="postalCode"]').val();
                    c.StateProvinceCode = $container.find('[name="state"]').val();
                    c.CountryCode = $container.find('[name="country"]').val();
                } else {
                    if (!c.CountryCode)
                        c.CountryCode = Accumulus.global.defaultCountryCode;
                }
                if (this.options.taxInformationCountries && c.CountryCode in this.options.taxInformationCountries) {
                    c.TaxNumber = $container.find('[name="taxNumber"]').val();
                    if (c.TaxNumber) {
                        c.TaxCode = widget.options.taxInformationCountries[c.CountryCode];
                    }
                }
            }
        },

        _populateSubscription: function () {
            var widget = this;
            var $container = widget.element;
            var offerCode = widget.options.offerCode;
            var subscription = widget.options.subscription;
            if (!(subscription instanceof Accumulus.Subscription)) {
                subscription = widget.options.subscription = new Accumulus.Subscription(offerCode, subscription);
            } else {
                subscription.offerCode = offerCode;
            }
            subscription.promotionCode = $container.find('[name="promotion"]').val();
        },

        _populateCreditCard: function () {
            var widget = this;
            var $container = this.element;
            if (!(widget._creditCard instanceof Accumulus.CreditCard)) {
                widget._creditCard = new Accumulus.CreditCard(widget._creditCard);
            }
            var creditCard = widget._creditCard;
            creditCard.name = $container.find('[name="ccName"]').val();
            creditCard.cardNumber = $container.find('[name="ccNumber"]').val();
            creditCard.cvv = $container.find('[name="cvv"]').val();
            creditCard.expirationDate = $container.find('[name="month"]').val() +
                $container.find('[name="year"]').val();

            var customer = widget.options.customer;
            creditCard.company = customer.Company;
            creditCard.addr1 = customer.AddressLine1;
            creditCard.addr2 = customer.AddressLine2;
            creditCard.city = customer.City;
            creditCard.stateProvinceCode = customer.StateProvinceCode;
            creditCard.postalCode = customer.PostalCode;
            creditCard.countryCode = customer.CountryCode;
        },

        _populateBankAccount: function () {
            var widget = this;
            var $container = widget.element;
            if (!(widget._bankAccount instanceof Accumulus.BankAccount)) {
                widget._bankAccount = new Accumulus.BankAccount(widget._bankAccount);
            }
            var bankAccount = widget._bankAccount;
            bankAccount.type = $container.find('[name="type"]').val();
            bankAccount.bank = $container.find('[name="bankName"]').val();
            bankAccount.route = $container.find('[name="routingNumber"]').val();
            bankAccount.number = $container.find('[name="accountNumber"]').val();
            bankAccount.name = $container.find('[name="bankAccountName"]').val();

            var customer = widget.options.customer;
            bankAccount.company = customer.Company;
            bankAccount.addr1 = customer.AddressLine1;
            bankAccount.addr2 = customer.AddressLine2;
            bankAccount.city = customer.City;
            bankAccount.stateProvinceCode = customer.StateProvinceCode;
            bankAccount.postalCode = customer.PostalCode;
            bankAccount.countryCode = customer.CountryCode;
        },

        _populateBillingAgreement: function () {
            var widget = this;
            if (!(widget._billingAgreement instanceof Accumulus.BillingAgreement)) {
                widget._billingAgreement = new Accumulus.BillingAgreement(widget._billingAgreement);
            }
            //TODO:remove email and name when they get removed from the backend.
            var billingAgreement = widget._billingAgreement;
            billingAgreement.name = 'Test Customer';
            billingAgreement.email = 'buyer_1329365063_per@accumulus.com';
            billingAgreement.confirmUrl = widget.options.confirmUrl;
            billingAgreement.cancelUrl = widget.options.cancelUrl;
        },

        _createSignup: function (signup, callback) {
            var url = Accumulus.serviceUrl + "/CreateSignup";
            var json = signup.toJson();
            Accumulus.API.jsonpCall(url, json, callback);
        },

        _applyPromotion: function () {
            var widget = this;
            var $container = widget.element;
            widget._populateSubscription();
            signup = new Accumulus.Signup(widget.options.tenantID, widget.options.token,
                widget.options.requestID, widget.options.timestamp, null, widget.options.subscription, null);
            widget._validatePromotion(signup, function (success, data) {
                //var errorField = $container.find('.acc-promotion-form .acc-server-error');
                var $msgField = $container.find('.acc-promotion-form .acc-promotion-msg');
                $msgField.empty();
                widget._trigger('validatePromotion', null, data);
                if (success) {
                    $container.find('.acc-server-error').hide();
                    $msgField.show();
                    $msgField.append(data.Message);
                    widget._calculateSignupFees();
                } else {
                    $msgField.hide();
                    widget._serverError(data);
                }
            });
        },

        _validatePromotion: function (signup, callback) {
            var widget = this;
            var url = Accumulus.serviceUrl + "/ValidatePromotion";
            var json = signup.toJson();
            Accumulus.API.jsonpCall(url, json, callback);
        },

        _calculateSignupFees: function (w) {
            var widget = this;
            var $container = widget.element;

            //var loadingImg = $('<img/>').attr('src', Accumulus.resourcesUrl + 'images/ajax-loader.gif');
            var loadingImg = '<img src="' + Accumulus.resourcesUrl + 'images/ajax-loader-arrows.gif"/>';
            var $feesField = $container.find('.acc-signup-fees-value');
            var $discountsField = $container.find('.acc-signup-discounts-value');
            var $taxesField = $container.find('.acc-signup-taxes-value');
            var $totalField = $container.find('.acc-signup-total-value');

            $feesField.append(loadingImg);
            $discountsField.append(loadingImg);
            $taxesField.append(loadingImg);
            $totalField.append(loadingImg);

            widget._populateCustomer();
            widget._populateSubscription();
            var signup = new Accumulus.Signup(this.options.tenantID, this.options.token, this.options.requestID,
                this.options.timestamp, this.options.customer, this.options.subscription, null);
            var url = Accumulus.serviceUrl + '/CalculateSignupFees';
            var data = signup.toJson();
            Accumulus.API.jsonpCall(url, data, function (success, response) {
                if (success) {
                    widget._setValueWithCurrency($feesField, response.Fees);
                    if (response.Discounts == 0) {
                        $container.find('.acc-signup-discounts').hide();
                    } else {
                        $container.find(".acc-signup-discounts").show();
                        widget._setValueWithCurrency($discountsField, response.Discounts);
                    }
                    if (response.Taxes == 0) {
                        $container.find('.acc-signup-taxes').hide();
                    } else {
                        $container.find(".acc-signup-taxes").show();
                        widget._setValueWithCurrency($taxesField, response.Taxes);
                    }
                    widget._setValueWithCurrency($totalField, response.Total);
                    widget._trigger('calculateSignupFees', null, response);
                } else {
                    widget._serverError(response);
                }
            });
        },

        _setValueWithCurrency: function ($field, value) {
            $field.html(value.toFixed(2));
            Accumulus.formatCurrency($field);
        },

        _initCreditCardSection: function () {
            var widget = this;
            var $container = this.element;

            var cardTypes = widget.options.creditCardTypes.split(',');
            var cardTypeImgs = Accumulus.images;
            var $imgContainer = $container.find('.acc-credit-card-imgs');
            for (var i = 0, cardType; cardType = cardTypes[i]; i++) {
                var src = cardTypeImgs[cardType];
                if (src) {
                    $imgContainer.append('<img src="' + src + '" />');
                }
            }

            widget._selectCurrentYear();

            $container.find('.acc-cvv-image')
                .attr('src', Accumulus.resourcesUrl + 'images/csc.png');
        },

        _selectCurrentYear: function () {
            var $container = this.element;
            var $yearSelect = $container.find('[name="year"]');
            var currentYear = (new Date()).getFullYear();
            for (var year = 2005; year <= 2099; year++) {
                var twoDigitsYear = year.toString().substring(2);
                $yearSelect.append(new Option(year, twoDigitsYear));
            }
            $yearSelect.val(currentYear.toString().substring(2));
        },

        _initBankAccountSection: function () {
            var widget = this;
            var $container = this.element;
            var $baImg = $container.find('.acc-bank-account-img');
            $baImg.attr('src', Accumulus.images.BA);
        },

        _initBillingAgreementSection: function () {
            var widget = this;
            var $container = this.element;
            var $ppImg = $container.find('.acc-paypal-img');
            $ppImg.attr('src', Accumulus.images.PP);
        },

        _fillUpForm: function () {
            var widget = this;
            var $container = widget.element;
            var o = widget.options;
            var c = o.customer;

            if (o.customer != null) {
                if (o.collectCustomer) {
                    //Customer Area
                    $container.find('[name="name"]').val(c.Name);
                    $container.find('[name="email"]').val(c.EmailAddress);
                    if (o.showCustomerPhone) {
                        $container.find('[name="phone"]').val(c.HomeNumber);
                    }
                    if (o.showCustomerAddress) {
                        $container.find('[name="company"]').val(c.Company);
                        $container.find('[name="address"]').val(c.AddressLine1);
                        $container.find('[name="postalCode"]').val(c.PostalCode);
                        $container.find('[name="city"]').val(c.City);
                    }
                }

                //CC Area
                $container.find('[name="ccName"]').val(c.Name);

                //BankAccount Area
                $container.find('[name="bankAccountName"]').val(c.Name);
            }
        },

        _setOption: function (key, value) {
            var widget = this;
            widget._super(key, value);
            var $container = widget.element;
            switch (key) {
                case "showPromotion":
                    if (value) {
                        $container.find('.acc-signup-description').addClass('ui-block-a');
                        $container.find('.acc-promotion-form').first().show();
                        $container.find('.acc-signup-pricing').first().show();
                    } else {
                        $container.find('.acc-promotion-form').first().hide();
                        if (!widget.options.showPrice && !widget.options.showPromotion) {
                            $container.find('.acc-signup-pricing').first().hide();
                            $container.find('.acc-signup-description').removeClass('ui-block-a');
                        }
                    }
                    break;
                case "showPrice":
                    if (value) {
                        $container.find('.acc-signup-description').addClass('ui-block-a');
                        widget._showPrice();
                        $container.find('.acc-signup-pricing').first().show();
                    } else {
                        widget._hidePrice();
                        if (!widget.options.showPrice && !widget.options.showPromotion) {
                            $container.find('.acc-signup-pricing').first().hide();
                            $container.find('.acc-signup-description').removeClass('ui-block-a');
                        }
                    }
                    break;
            }
            this._super("_setOption", key, value);
        },

        _showPrice: function () {
            var widget = this;
            var $container = widget.element;
            $container.find('.acc-signup-price-details').show();
            widget._calculateSignupFees();

            if (widget.options.collectCustomer) {
                var self = this;
                $container.find('[name="state"]').on("focusout", function () {
                    self._calculateSignupFees()
                });

                $container.find('[name="taxNumber"]').on("focusout", function () {
                    self._calculateSignupFees()
                });
            }
        },

        _hidePrice: function () {
            var widget = this;
            var $container = widget.element;
            $container.find('.acc-signup-price-details').hide();
        }
    });
})(jQuery);

//Accumulus Classes
function AccView(path) {
    var $ = jQuery;
    var o = this;
    o.path = path;
    o.content = null;
    o.getContent = function (callback) {
        if (o.content) {
            callback(o.content);
        } else {
            $(o).on('contentLoaded', function (event, data) {
                callback(data);
            });
            if (!isLoading) {
                loadContent();
            }
        }
    };
    var isLoading = false;
    var loadContent = function () {
        isLoading = true;
        Accumulus.info("Loading view content from server..." + path);
        $.get(path, function (data) {
            isLoading = false;
            o.content = data;
            $(o).trigger('contentLoaded', data);
        });
    };
}

///////////////////////////////////////////////////////////////////////////////////
/////////// Markup Framework //////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

function AccAttribute(container, attrName) {
    var $ = jQuery;
    this.container = container;
    this.attrName = attrName;
    this.getRawValue = function () {
        var rawVal = $(this.container).attr(this.attrName);
        if (!rawVal) {
            Accumulus.info2('Value not assigned to ' + this.attrName
                + ' in ' + $(this.container).attr('name'));
        }
        return rawVal;
    }
    this.getValue = this.getRawValue;
}

function AccBoolean(container, attrName) {
    AccAttribute.call(this, container, attrName);
    this.getValue = function () {
        var s = this.getRawValue();
        if (s === 'true' || s === true) {
            return true;
        } else if (s === 'false' || s === false) {
            return false;
        } else {
            return null;
        }
    };
}
AccBoolean.prototype = Object.create(AccAttribute.prototype);

function AccJson(container, attrName) {
    AccAttribute.call(this, container, attrName);
    this.getValue = function () {
        var val = this.getRawValue();
        if (val && val.length > 1
            && val.charAt(0) == '{'
            && val.charAt(val.length - 1) == '}') {
            val = '(' + val + ')';
        }
        try {
            return eval(val);
        } catch (e) {
            Accumulus.error(e.message);
        }
    }
}
AccJson.prototype = Object.create(AccAttribute.prototype);

function AccHandler(container, attrName) {
    AccAttribute.call(this, container, attrName);
    this.getValue = function () {
        var val = this.getRawValue();
        if (val) {
            var method = window[val];
            if (method && jQuery.isFunction(method)) {
                return method;
            } else {
                Accumulus.error('Invalid method name ' + val);
                return null;
            }
        }
    }
}
AccHandler.prototype = Object.create(AccAttribute.prototype);

function AccMarkupOption(markupPropertyName, widgetPropertyName, type) {
    this.markupPropertyName = markupPropertyName;
    this.widgetPropertyName = widgetPropertyName;
    this.type = type;
}
