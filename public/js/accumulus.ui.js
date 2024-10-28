// On document Ready...
jQuery(function ($) {
    var mode = Accumulus.constants.UI;
    var A = {
        plugins: {
            balance: {
                balanceView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/balance.html')
            },
            profile: {
                profileView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/profile_view.html'),
                profileEditView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/profile_edit.html')
            },
            subscriptionList: {
                subscriptionsView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/subscriptionList_view.html'),
                editSubscriptionView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/subscriptionList_details.html')
            },
            statementHistory: {
                statementsView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/statementHistory_list.html')
            },
            paymentMethods: {
                paymentMethodsView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/paymentMethods_view.html'),
                editCreditCardView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/creditCard_edit.html'),
                editBankAccountView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/bankAccount_edit.html'),
                creditCardItemView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/creditCard_item.html'),
                bankAccountItemView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/bankAccount_item.html'),
                billingAgreementItemView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/billingAgreement_item.html')
            },
            usageBalances: {
                balancesView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/usageBalances.html')
            },
            usageHistory: {
                usageHistoryView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/usageHistory_view.html'),
                usageDetailsView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/usageHistory_details.html')
            },
            makePayment: {
                makePaymentView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/makePayment.html'),
                paymentAppliedView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/paymentApplied.html')
            },
            portal: {
                selectWidgetView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/portal.html'),
                emptyWidgetAreaView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/emptyWidgetArea.html')
            },
            signup: {
                signupView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/signup.html')
            }
        }
    };

    Accumulus = $.extend(true, A, Accumulus);

    Accumulus.API.yesNoPrompt = function (title, text, yesLabel, noLabel, callback) {
        var $container = $('<div></div>');
        try {
            $(document.body).append($container);
            $container.load(
                A.resourcesUrl + 'forms/' + mode + '/yesNoDialog.html',
                function () {
                    var $dialog = $('#accYesNoDialog');

                    $dialog.find('.acc-no').val(noLabel).button();
                    $dialog.find('.acc-yes').val(yesLabel).button();
                    $dialog.attr('title', title);
                    $dialog.find('.acc-text').text(text);

                    $dialog.dialog({
                        modal: true,
                        close: function (event, ui) {
                            $dialog.dialog('destroy');
                            $container.remove();
                        }
                    });

                    $dialog.find('.acc-no').bind('click', function () {
                        callback(false);
                        $dialog.dialog('close');
                    });

                    $dialog.find('.acc-yes').bind('click', function () {
                        callback(true);
                        $dialog.dialog('close');
                    });
                });
        } catch (e) {
            console.error(e.message);
        } finally {
        }
    };

    if (Accumulus.showLoadingOverlay) {
        $(document.body)
            .append('<div class="acc-overlay ui-widget-overlay ui-front ui-helper-hidden"></div>')
            .append('<div class="acc-loader"></div>');

        jQuery(document).ajaxStart(function () {
            $('.acc-loader').show();
            $('.acc-overlay').show();
        });

        jQuery(document).ajaxStop(function () {
            $('.acc-overlay').hide();
            $('.acc-loader').hide();
        });
    }

    Accumulus.initAccumulus();
});

// As loading...
(function ($) {
    $.widget("accumulus.widget", $.accumulus.widget, {
        _create: function () {
            this._super();
            this.element.addClass('ui-widget');
        },
        _setSelectValue: function (select, value, rebuild) {
            $(select).val(value);
        },
        _createServerErrorWrapper: function (msg) {
            return $('<div class="acc-server-error ui-state-error ui-corner-all">' + msg + '</div>');
        },
        _validationErrorPlacement: function (error, element) {
            error.addClass('ui-state-highlight ui-corner-all')
                .appendTo(element.parent());
        },
        _destroy: function () {
            this.element.removeClass('ui-widget');
            this._super();
        },
        _openModal: function (modal) {
            $(modal).dialog("open");
        },
        _closeModal: function (modal) {
            $(modal).dialog("close");
        }
    });

    $.widget("accumulus.profile", $.accumulus.profile, {
        _initViewForm: function () {
            this._super();
            this._$viewForm.find('.acc-edit').button();
        },
        _initEditForm: function () {
            this._super();
            var $editContainer = this.element.find('.acc-profile-edit-view');
            $editContainer.find('.acc-save').button();
            $editContainer.find('.acc-cancel').button();
            $editContainer.find('.acc-submit-password').button();

            var $passwordPopup = $editContainer.find('.acc-password-popup');
            if (Accumulus.labels.profile['changePassword']) {
                $passwordPopup.attr('title', Accumulus.labels.profile['changePassword']);
            }
            $passwordPopup.dialog({ autoOpen: false });

            $editContainer.find('.acc-change-password').button().bind('click', function () {
                $passwordPopup.dialog("open");
            });
        },
        _fillEditForm: function () {
            this._super();
            this._$editContainer.find('[name="country"]').trigger("change");
        },
        _cancelPassword: function () {
            $('#acc-popup-password').dialog("close");
        },
        _destroy: function () {
            this._super();
            var $passwordPopup = $('#acc-popup-password');
            this._closeModal($passwordPopup);
            $passwordPopup.dialog('destroy');
            $passwordPopup.remove();
        }
    });

    $.widget("accumulus.subscriptionList", $.accumulus.subscriptionList, {
        _fillDetailsForm: function () {
            var widget = this;
            widget._super();

            var $container = widget._$detailsContainer;

            $container.find('.acc-ok').button();

            var $cancelSubscriptionBtn = $container.find('.acc-cancel-subscription');
            $cancelSubscriptionBtn.button();

            var status = widget._subscription.Status;
            if (status == 'Inactive') {
                $cancelSubscriptionBtn.button('disable');
            }
        },
        _createSubscriptionItems: function () {
            var widget = this;
            var s = widget._subscription;
            var $detailsContainer = widget._$detailsContainer;

            var $subscriptionItemsContainer = $detailsContainer.find('.acc-subscription-items');
            $subscriptionItemsContainer.empty();

            if (s.SubscriptionItems && s.SubscriptionItems.length > 0) {
                for (var i in s.SubscriptionItems) {
                    var item = s.SubscriptionItems[i];
                    var subscriptionItemID = item.SubscriptionItemID || '';
                    var productCode = item.ProductCode || '';
                    var status = item.Status || '';

                    try {
                        status = Accumulus.labels.subscriptionList[status] || status;
                        productCode = Accumulus.labels.subscriptionList.productCode[productCode] || productCode;
                    } catch (e) {
                        console.log(e.msg);
                    }

                    var fullDescription = subscriptionItemID + ' ' +
                        productCode + ' ' + status;

                    var $itemContainer = $('<h4></h4>').text(fullDescription);

                    var fields = item.Fields;
                    var itemFieldsHandler = widget.options.itemFieldsHandler;

                    var $fieldsContainer = $('<div></div>');

                    if (fields && fields.length > 0) {

                        if (typeof itemFieldsHandler == 'function') {
                            fields = itemFieldsHandler(fields);
                        }

                        for (var j in fields) {
                            var field = fields[j];
                            var productFieldCode = field.ProductFieldCode || '';
                            try {
                                productFieldCode = Accumulus.labels.subscriptionList.productFieldCode[productFieldCode] || productFieldCode;
                            } catch (e) {
                                console.log(e.msg);
                            }

                            $fieldsContainer.append(
                                $('<fieldset></fieldset>')
                                    .append(
                                        $('<label></label>').text(productFieldCode))
                                    .append(
                                        $('<div></div>').text(field.Value))
                            );
                        }
                    } else {
                        $fieldsContainer.append(Accumulus.labels.subscriptionList['noFields']);
                    }

                    $subscriptionItemsContainer.append($itemContainer);
                    $subscriptionItemsContainer.append($fieldsContainer);
                }

                $subscriptionItemsContainer.accordion({
                    collapsible: true,
                    active: false,
                    heightStyle: 'content'
                });

            } else {
                $detailsContainer.find('.acc-no-subscription-items').show();
            }
        }
    });

    $.widget("accumulus.paymentMethods", $.accumulus.paymentMethods, {
        _fillPaymentMethodsView: function () {
            var widget = this;
            widget._super();
            var $container = widget._$viewForm;
            $container.find('.acc-add-credit-card').button();
            $container.find('.acc-add-bank-account').button();
            $container.find('.acc-add-billing-agreement').button();
            $container.find('.acc-reload-billing-agreements').button({
                icons: { primary: "ui-icon-refresh" },
                text: false
            });
        },
        _enhanceCCItem: function (item) {
            var $item = $(item);
            $item.find('.acc-edit-credit-card').button();
            $item.find('.acc-delete-credit-card').button();
            $item.find('.acc-default-payment-method').button();
            $item.accordion({ collapsible: true, active: false, heightStyle: "content" });
        },
        _enhanceBAItem: function (item) {
            var $item = $(item);
            $item.find('.acc-edit-bank-account').button();
            $item.find('.acc-delete-bank-account').button();
            $item.find('.acc-default-payment-method').button();
            $item.accordion({ collapsible: true, active: false, heightStyle: "content" });
        },
        _enhancePPItem: function (item) {
            var $item = $(item);
            $item.find('.acc-billing-agreement-delete').button();
            $item.find('.acc-default-payment-method').button();
            $item.accordion({ collapsible: true, active: false, heightStyle: "content" });
        },
        _initCreditCardForm: function () {
            var widget = this;
            widget._super();

            var $container = this.element;
            var $form = $container.find('.acc-credit-card-edit-view');
            $form.find('.acc-save').button();
            $form.find('.acc-cancel').button();
        },
        _initBankAccountForm: function () {
            var widget = this;
            widget._super();
            var $container = this.element;
            var $form = $container.find('.acc-bank-account-edit-view');
            $form.find('.acc-save').button();
            $form.find('.acc-cancel').button();
        },
        _fillCreditCardForm: function () {
            this._super();
            this._$detailsContainer.find('[name="number"]').attr('disabled', true);
        },
        _fillBankAccountForm: function () {
            this._super();
            this._$detailsContainer.find('[name="accountNumber"]').attr('disabled', true);
        }
    });

    $.widget("accumulus.usageHistory", $.accumulus.usageHistory, {
        _initDetailsForm: function () {
            this._super();
            this._$detailsContainer.find('.acc-ok').button();
        }
    });

    $.widget("accumulus.usageBalances", $.accumulus.usageBalances, {
        _fillViewForm: function () {
            var widget = this;
            var usageBalances = widget._usageBalances;
            var $viewForm = widget._$viewForm;
            var list = $viewForm.find('.acc-usage-balances-list');
            list.empty();

            var template =
                '<li>' +
                    '<fieldset><label>${usageTypeLabel}</label><span>${usageType}</span></fieldset>' +
                    '<fieldset><label>${paidLabel}</label><span>${paidBalance}</span></fieldset>' +
                    '<fieldset><label>${giftLabel}</label><span>${giftBalance}</span></fieldset>' +
                '</li>';

            if (usageBalances && usageBalances.length > 0) {
                for (var i in usageBalances) {
                    var b = usageBalances[i];

                    //Labels
                    var usageTypeLabel = "Type:";
                    try {
                        usageTypeLabel = Accumulus.labels.usageBalances['type:'];
                    } catch (e) { Accumulus.info(e.msg) };

                    var paidLabel = "Paid balance:";
                    try {
                        paidLabel = Accumulus.labels.usageBalances['paidBalance:'];
                    } catch (e) { Accumulus.info(e.msg) };

                    var giftLabel = "Gift balance:";
                    try {
                        giftLabel = Accumulus.labels.usageBalances['giftBalance:'];
                    } catch (e) { Accumulus.info(e.msg) };

                    //Values
                    var typeCode = b.UsageTypeCode;
                    var usageType = null;
                    try {
                        //TODO: might have to move all codes to a single category, are they the same category as status? Does every widget can share the same codes?
                        usageType = Accumulus.labels.usageBalances.usageTypeCodes[typeCode];
                    } catch (e) { Accumulus.info(e.msg) };
                    usageType = usageType || b.UsageTypeName || '';

                    var paidBalance = b.PaidBalance;
                    var giftBalance = b.GiftBalance;

                    if (typeof widget.options.formatQuantityHandler == 'function') {
                        paidBalance = widget.options.formatQuantityHandler(typeCode, paidBalance);
                        giftBalance = widget.options.formatQuantityHandler(typeCode, giftBalance);
                    }

                    var html = Accumulus.format(template, {
                        usageTypeLabel: usageTypeLabel,
                        usageType: usageType,
                        paidLabel: paidLabel,
                        paidBalance: paidBalance,
                        giftLabel: giftLabel,
                        giftBalance: giftBalance
                    });

                    list.append(html);
                }
            } else {
                var noBalancesLabel = 'No usage balances';
                try {
                    noBalancesLabel = Accumulus.labels.usageBalances.noBalances;
                } catch (e) {
                    Accumulus.info("There's no label for noBalances defined")
                }
                $viewForm.append('<div>' + noBalancesLabel + '</div>');
            }
        }
    });

    $.widget("accumulus.makePayment", $.accumulus.makePayment, {
        _enhanceView: function () {
            this.element.find('.acc-submit-payment').button();
        }
    });

    $.widget("accumulus.portal", $.accumulus.portal, {
        _widgetSelected: null,
        _currentLiSelected: null,

        _initView: function () {
            var widget = this;
            widget._super();
            var $container = widget.element;
            $container.find('.acc-login').button();
            $container.find('.acc-get-captcha').button();
            $container.find('.acc-reset-password').button();
            $container.find('.acc-cancel').button();
            $container.find('.acc-logout').button();
            $container.find('.acc-submit-password').button();
            $container.find('.acc-widget-menu').menu();
        },

        _markSelected: function (li) {
            var widget = this;
            $(widget._currentLiSelected).find('a').removeClass('acc-widget-selected');
            widget._currentLiSelected = li;
            $(widget._currentLiSelected).find('a').addClass('acc-widget-selected');
        },

        _showCustomerName: function (customerName) {
            this.element
                .find('.acc-customer-name')
                .text(customerName)
                .css('display', 'inline-block');
        },

        _enhanceView: function () {
            var widget = this;
            var $container = widget.element;
            var $innerWidget = $('<div></div>');
            var $viewForm = $container.find('.acc-portal-content');

            //BALANCE
            if (widget.options.showBalance) {
                $viewForm.find('.acc-balance-selection').bind('click', function () {
                    widget._markSelected(this);
                    widget._widgetSelected = 'balance';
                    var options = widget._getWidgetOptions();
                    $viewForm.find('.acc-plugin-container').empty().append($innerWidget);
                    $innerWidget[widget._widgetSelected](options);
                });
            } else {
                $viewForm.find('.acc-balance-selection').remove();
            }

            //PROFILE
            if (widget.options.showProfile) {
                $viewForm.find('.acc-profile-selection').bind('click', function () {
                    if (widget._widgetSelected !== 'profile') {
                        widget._markSelected(this);
                        widget._widgetSelected = 'profile';
                        var options = widget._getWidgetOptions();
                        var profileOptions = {
                            customerEditCallback: widget.options.profile_onCustomerEdit,
                            passwordChangeCallback: widget.options.profile_onPasswordChange,
                            showChangePassword: widget.options.profile_showChangePassword,
                            vatOnEServices: widget.options.profile_vatOnEServices,
                            taxInformationCountries: widget.options.profile_taxInformationCountries
                        };
                        $.extend(profileOptions, options);
                        $viewForm.find('.acc-plugin-container').empty().append($innerWidget);
                        $innerWidget[widget._widgetSelected](profileOptions);
                    }
                });
            } else {
                $viewForm.find('.acc-profile-selection').remove();
            }

            //PAYMENT METHODS
            if (widget.options.showPaymentMethods) {
                $viewForm.find('.acc-payment-methods-selection').bind('click', function () {
                    if (widget._widgetSelected !== 'paymentMethods') {
                        widget._markSelected(this);
                        widget._widgetSelected = 'paymentMethods';
                        var options = widget._getWidgetOptions();
                        var paymentMethodsOptions = {
                            showCreditCards: widget.options.paymentMethods_showCreditCards,
                            showBankAccounts: widget.options.paymentMethods_showBankAccounts,
                            showBillingAgreements: widget.options.paymentMethods_showBillingAgreements,
                            confirmUrl: widget.options.paymentMethods_confirmUrl,
                            cancelUrl: widget.options.paymentMethods_cancelUrl
                        };
                        $.extend(paymentMethodsOptions, options);
                        $viewForm.find('.acc-plugin-container').empty().append($innerWidget);
                        $innerWidget[widget._widgetSelected](paymentMethodsOptions);
                    }
                });
            } else {
                $viewForm.find('.acc-payment-methods-selection').remove();
            }

            //SUBSCRIPTIONS LIST
            if (widget.options.showSubscriptionList) {
                $viewForm.find('.acc-subscriptions-list-selection').bind('click', function () {
                    if (widget._widgetSelected !== 'subscriptionList') {
                        widget._markSelected(this);
                        widget._widgetSelected = 'subscriptionList';
                        var options = widget._getWidgetOptions();
                        var subscriptionListOptions = {
                            itemFieldsHandler: widget.options.subscriptionList_itemFieldsHandler,
                            cancelSubscription: widget.options.subscriptionList_cancelSubscription
                        };
                        $.extend(subscriptionListOptions, options);
                        $viewForm.find('.acc-plugin-container').empty().append($innerWidget);
                        $innerWidget[widget._widgetSelected](subscriptionListOptions);
                    }
                });
            } else {
                $viewForm.find('.acc-subscriptions-list-selection').remove();
            }

            //STATEMENTS HISTORY
            if (widget.options.showStatementHistory) {
                $viewForm.find('.acc-statement-history-selection').bind('click', function () {
                    if (widget._widgetSelected !== 'statementHistory') {
                        widget._markSelected(this);
                        widget._widgetSelected = 'statementHistory';
                        var options = widget._getWidgetOptions();
                        $viewForm.find('.acc-plugin-container').empty().append($innerWidget);
                        $innerWidget[widget._widgetSelected](options);
                    }
                });
            } else {
                $viewForm.find('.acc-statement-history-selection').remove();
            }

            //USAGE BALANCES
            if (widget.options.showUsageBalances) {
                $viewForm.find('.acc-usage-balances-selection').bind('click', function () {
                    if (widget._widgetSelected !== 'usageBalances') {
                        widget._markSelected(this);
                        widget._widgetSelected = 'usageBalances';
                        var options = widget._getWidgetOptions();
                        var usageBalancesOptions = {
                            formatQuantityHandler: widget.options.usageBalances_formatQuantityHandler
                        };
                        $.extend(usageBalancesOptions, options);
                        $viewForm.find('.acc-plugin-container').empty().append($innerWidget);
                        $innerWidget.usageBalances(usageBalancesOptions);
                    }
                });
            } else {
                $viewForm.find('.acc-usage-balances-selection').remove();
            }

            //USAGE HISTORY
            if (widget.options.showUsageHistory) {
                $viewForm.find('.acc-usage-history-selection').bind('click', function () {
                    if (widget._widgetSelected !== 'usageHistory') {
                        widget._markSelected(this);
                        widget._widgetSelected = 'usageHistory';
                        var options = widget._getWidgetOptions();
                        var usageHistoryOptions = {
                            skip: widget.options.usageHistory_skip,
                            take: widget.options.usageHistory_take,
                            fromDateTime: widget.options.usageHistory_fromDateTime
                        };
                        $.extend(usageHistoryOptions, options);
                        $viewForm.find('.acc-plugin-container').empty().append($innerWidget);
                        $innerWidget[widget._widgetSelected](usageHistoryOptions);
                    }
                });
            } else {
                $viewForm.find('.acc-usage-history-selection').remove();
            }

            //MAKE PAYMENT
            if (widget.options.showMakePayment) {
                $viewForm.find('.acc-make-payment-selection').bind('click', function () {
                    if (widget._widgetSelected !== 'makePayment') {
                        widget._markSelected(this);
                        widget._widgetSelected = 'makePayment';
                        var options = widget._getWidgetOptions();
                        var makePaymentOptions = {
                            paymentMade: widget.options.makePayment_onPaymentMade
                        };
                        $.extend(makePaymentOptions, options);
                        $viewForm.find('.acc-plugin-container').empty().append($innerWidget);
                        $innerWidget[widget._widgetSelected](makePaymentOptions);
                    }
                });
            } else {
                $viewForm.find('.acc-make-payment-selection').remove();
            }

            window.addEventListener('popstate', function (e) {
                widget._selectCurrentTabFromUrl($viewForm);
            });

            if (!widget._selectCurrentTabFromUrl($viewForm)) {
                var emptyWidgetAreaView = Accumulus.plugins.portal.emptyWidgetAreaView;
                emptyWidgetAreaView.getContent(function (content) {
                    var $pluginContainer = $viewForm.find('.acc-plugin-container');
                    $pluginContainer.html(content);
                    Accumulus.localize($pluginContainer, Accumulus.labels.portal);
                });
            }
        },

        _selectCurrentTabFromUrl: function ($viewForm) {
            var currentTabSelected = false;
            var url = window.location.href, idx = url.indexOf("#");
            var hash = idx != -1 ? url.substring(idx + 1) : "";
            if (hash) {
                var currentSelection = $viewForm.find('.' + hash + '-selection');
                if (currentSelection) {
                    currentSelection.click();
                    currentTabSelected = true;
                }
            }
            return currentTabSelected;
        },

        _showCaptcha: function (captchaUrl) {
            var $form = this.element.find('.acc-reset-password-form');
            $form.find('.acc-captcha-field').show();
            $form.find('.acc-captcha-img').attr('src', captchaUrl);
            $form.find('.acc-get-captcha').hide();
            $form.find('.acc-reset-password').show();
        },

        _hideCaptcha: function () {
            var $form = $(this.element).find('.acc-reset-password-form');
            $form.find('.acc-get-captcha').show();
            $form.find('.acc-reset-password').hide();
            $form.find('[name="captcha"]').val(null);
            $form.find('.acc-captcha-field').hide();
        }
    });

    $.widget("accumulus.signup", $.accumulus.signup, {
        _subscriptionItemSectionTemplate:
            '<div class="acc-subscription-item-information">' +
                '<div class="acc-subscription-item-banner acc-title ui-widget-header ui-corner-all">' +
                    '<h3>${productName}</h3>' +
                '</div>' +
                '<div class="acc-subscription-item-form"></div>' +
            '</div>',

        _customInputFieldTemplate:
            '<fieldset class="acc-custom-field">' +
                '<label for="acc-subscription-item-field-${code}" class="acc-description-label">${name}</label>' +
                '<input id="acc-subscription-item-field-${code}" name="${code}" type="text" class="acc-extended-input" ${required} ${pattern} />' +
            '</fieldset>',

        _customSelectFieldTemplate:
            '<fieldset class="acc-custom-field">' +
                '<label for="acc-subscription-item-field-${code}" class="acc-description-label">${name}</label>' +
                '<select id="acc-subscription-item-field-${code}" name="${code}" class="acc-extended-input" ${required}></select>' +
            '</fieldset>',

        _enhanceView: function () {
            var widget = this;
            var $container = widget.element;
            var $paymentForms = $container.find('.acc-payment-forms');

            $container.find('.acc-apply').button();
            $container.find('.acc-subscribe-submit').button();
            $container.find('.acc-close').button();

            $container.find('.acc-tc-reminder').dialog({
                autoOpen: false,
                title: Accumulus.labels.signup.termsAndConditionsTitle
            });

            $container.find('.acc-must-select-payment-method').dialog({
                autoOpen: false,
                title: Accumulus.labels.signup.selectPaymentMethod
            });

            //TODO: might want to validate that the default payment method is shown
            var defaultPaymentMethod = null;
            switch (widget.options.defaultPaymentMethod) {
                case Accumulus.constants.CREDIT_CARD:
                    defaultPaymentMethod = 0;
                    widget._selectedPaymentMethod = Accumulus.constants.CREDIT_CARD;
                    break;
                case Accumulus.constants.BANK_ACCOUNT:
                    defaultPaymentMethod = 1;
                    widget._selectedPaymentMethod = Accumulus.constants.BANK_ACCOUNT;
                    break;
                case Accumulus.constants.BILLING_AGREEMENT:
                    defaultPaymentMethod = 2;
                    widget._selectedPaymentMethod = Accumulus.constants.BILLING_AGREEMENT;
                    break;
            }

            $paymentForms.accordion({ active: defaultPaymentMethod, icons: false, heightStyle: 'content' });

            $paymentForms.on("accordionactivate", function (event, ui) {
                if (ui.newHeader.hasClass('acc-credit-card-header')) {
                    widget._selectedPaymentMethod = Accumulus.constants.CREDIT_CARD;
                } else if (ui.newHeader.hasClass('acc-bank-account-header')) {
                    widget._selectedPaymentMethod = Accumulus.constants.BANK_ACCOUNT;
                } else if (ui.newHeader.hasClass('acc-billing-agreement-header')) {
                    widget._selectedPaymentMethod = Accumulus.constants.BILLING_AGREEMENT;
                }
            });

            if (!widget.options.showCreditCard) {
                $container.find('.acc-credit-card-collapsible').hide();
                $container.find('.acc-credit-card-header').hide();
            }

            if (!widget.options.showBankAccount) {
                $container.find('.acc-bank-account-collapsible').hide();
                $container.find('.acc-bank-account-header').hide();
            }

            if (!widget.options.showBillingAgreement) {
                $container.find('.acc-billing-agreement-header').hide();
                $container.find('.acc-billing-agreement-collapsible').hide();
            }

            if (widget.options.subscription && widget.options.subscription.promotionCode) {
                $container.find('.acc-promotion-code').val(widget.options.subscription.promotionCode);
            }
        }
    });
})(jQuery);
