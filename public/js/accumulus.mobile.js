// On document Ready...
jQuery(function ($) {
    var mode = Accumulus.constants.MOBILE;
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
                selectWidgetView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/portal.html')
            },
            signup: {
                signupView: new AccView(Accumulus.resourcesUrl + 'forms/' + mode + '/signup.html')
            }
        }
    };

    Accumulus = $.extend(true, A, Accumulus);

    if (Accumulus.showLoadingOverlay) {
        var $overlay = '<div class="acc-overlay ui-popup-screen ui-overlay-a in"></div>';
        $(document.body).append($overlay);

        $(document).ajaxStart(function () {
            $('.acc-overlay').show();
            $('.ui-loader').show();
        });
        $(document).ajaxStop(function () {
            $('.acc-overlay').hide();
            $('.ui-loader').hide();
        });
    }

    Accumulus.API.yesNoPrompt = function (title, text, yesLabel, noLabel, callback) {
        var $container = $('<div></div>');
        try {
            $('[data-role="page"]').append($container);
            $container.load(
                    A.resourcesUrl + 'forms/' + mode + '/yesNoDialog.html',
                function () {
                    var popup = $(this).find('#accYesNoDialog');
                    popup.popup({
                        afterclose: function (event, ui) {
                            dialog.popup('destroy');
                            $container.remove();
                        }
                    });

                    var dialog = $('#accYesNoDialog');
                    dialog.find('.acc-no').val(noLabel);
                    dialog.find('.acc-yes').val(yesLabel);
                    dialog.find('.acc-title').text(title);
                    dialog.find('.acc-text').text(text);

                    dialog.find('.acc-no').bind('click', function () {
                        callback(false);
                        dialog.popup('close');
                    });
                    dialog.find('.acc-yes').bind('click', function () {
                        callback(true);
                        dialog.popup('close');
                    });

                    popup.enhanceWithin();
                    dialog.popup('open');
                });
        } catch (e) {
            console.error(e.message);
        } finally { }
    };

    Accumulus.initAccumulus();
});

(function ($) {
    $.widget("accumulus.widget", $.accumulus.widget, {
        _setSelectValue: function (select, value, rebuild) {
            if (rebuild) {
                $(select).val(value).selectmenu('refresh', true);
            } else {
                $(select).val(value).selectmenu('refresh');
            }
        },
        _createServerErrorWrapper: function (msg) {
            return $('<div class="acc-server-error">' + msg + '</div>');
        },
        _validationErrorPlacement: function (error, element) {
            error.insertAfter($(element).parent());
        },
        _openModal: function (modal) {
            $(modal).popup('open');
        },
        _closeModal: function (modal) {
            $(modal).popup('close');
        }
    });

    $.widget("accumulus.profile", $.accumulus.profile, {
        _initViewForm: function () {
            this._super();
            this._$viewForm.enhanceWithin();
        },
        _initEditForm: function () {
            this._super();
            this.element.find('.acc-profile-edit-view').enhanceWithin();
        },
        _fillEditForm: function () {
            this._super();
            this._$editContainer.find('[name="country"]').selectmenu("refresh").trigger("change");
        },
        _countrySelected: function () {
            var widget = this;
            var $editForm = this._$editContainer;
            var statesSelect = $editForm.find('[name="state"]');
            var c = this._customer;
            var contains = false;

            statesSelect.empty();
            statesSelect.append(new Option(Accumulus.labels.profile.selectState));

            widget._fetchStates(function (success, response) {
                if (success) {
                    var states = response.StatesAndProvinces;
                    for (var i in states) {
                        statesSelect.append(
                            new Option(states[i].Name, states[i].StateProvinceCode));
                        if (states[i].StateProvinceCode == c.StateProvinceCode) {
                            contains = true;
                        }
                    }
                    statesSelect.selectmenu("refresh", true);
                    if (contains) {
                        statesSelect.val(c.StateProvinceCode);
                        statesSelect.selectmenu("refresh");
                    }
                } else {
                    widget._serverError(data);
                }
            });
        },
        _cancelPassword: function () {
            $('#acc-popup-password').popup("close");
        }
    });

    $.widget("accumulus.subscriptionList", $.accumulus.subscriptionList, {
        _fillSubscriptionsView: function () {
            this._super();
            this._$viewForm.enhanceWithin();
        },
        _fillDetailsForm: function () {
            var widget = this;
            widget._super();

            var $detailsContainer = widget._$detailsContainer;

            widget._$detailsContainer.enhanceWithin();
            var status = widget._subscription.Status;
            if (status == 'Inactive') {
                $detailsContainer.find('.acc-cancel-subscription').addClass('ui-disabled');
            }
        },
        _createSubscriptionItems: function () {
            var widget = this;
            var s = widget._subscription;
            var $detailsContainer = widget._$detailsContainer;

            var subscriptionItemsContainer = $detailsContainer.find('.acc-subscription-items');
            subscriptionItemsContainer.empty();

            if (s.SubscriptionItems && s.SubscriptionItems.length > 0) {
                for (var i in s.SubscriptionItems) {

                    var item = s.SubscriptionItems[i];
                    var itemContainer = $('<li></li>');

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

                    var fields = item.Fields;

                    if (fields && fields.length > 0) {

                        var itemFieldsHandler = widget.options.itemFieldsHandler;
                        if (typeof itemFieldsHandler == 'function') {
                            fields = itemFieldsHandler(fields);
                        }

                        var fieldsContainer = $('<div></div>').addClass('ui-grid-a'); //TODO: review mobile only
                        for (var j in fields) {

                            var field = fields[j];
                            var productFieldCode = field.ProductFieldCode || '';
                            try {
                                productFieldCode = Accumulus.labels.subscriptionList.productFieldCode[productFieldCode] || productFieldCode;
                            } catch (e) {
                                console.log(e.msg);
                            }

                            fieldsContainer
                                .append($('<div></div>')
                                    .addClass('ui-block-a') //TODO: review mobile only
                                    .append($('<label></label>').text(productFieldCode)))
                                .append($('<div></div>')
                                    .addClass('ui-block-b') //TODO: review mobile only
                                    .append($('<span></span>').text(field.Value)));
                        }
                        itemContainer.append($('<div></div>')
                            .append($('<h4></h4>').text(fullDescription))
                            .append(fieldsContainer)
                            .attr('data-role', 'collapsible') //TODO: review mobile only
                            .attr('data-theme', 'c')
                            .attr('data-inset', 'false')
                            .attr('data-iconpos', 'right'));
                    } else {
                        itemContainer
                            .addClass('list-item-padding')
                            .text(fullDescription);
                    }

                    itemContainer.appendTo(subscriptionItemsContainer);

                }
            } else {
                $detailsContainer.find('.acc-no-subscription-items').show();
            }
        }
    });

    $.widget("accumulus.statementHistory", $.accumulus.statementHistory, {
        _initStatementsView: function () {
            this._super();
            this.element.enhanceWithin();
        }
    });

    $.widget("accumulus.paymentMethods", $.accumulus.paymentMethods, {
        _initCreditCardForm: function () {
            this._super();
            var $detailsContainer = this.element.find('.acc-credit-card-edit-view');
            $detailsContainer.enhanceWithin();
        },
        _initBankAccountForm: function () {
            this._super();
            var $detailsContainer = this.element.find('.acc-bank-account-edit-view');
            $detailsContainer.enhanceWithin();
        },
        _fillPaymentMethodsView: function () {
            this._super();
            this._$viewForm.enhanceWithin();
        },
        _enhanceCCItem: function (item) {
            $(item).enhanceWithin();
        },
        _enhanceBAItem: function (item) {
            $(item).enhanceWithin();
        },
        _enhancePPItem: function (item) {
            $(item).enhanceWithin();
        },
        _fillCreditCardForm: function () {
            var widget = this;
            widget._super();
            var $detailsContainer = this._$detailsContainer;
            $detailsContainer.find('[name="month"]').selectmenu('refresh');
            $detailsContainer.find('[name="year"]').selectmenu('refresh');
            $detailsContainer.find('[name="country"]').selectmenu('refresh');
            $detailsContainer.find('[name="number"]').textinput('disable');
        },
        _fillBankAccountForm: function () {
            var widget = this;
            widget._super();
            var $detailsContainer = this._$detailsContainer;
            $detailsContainer.find('[name="type"]').selectmenu('refresh');
            $detailsContainer.find('[name="country"]').val(country);
            $detailsContainer.find('[name="accountNumber"]').textinput('disable');
        }
    });

    $.widget("accumulus.usageBalances", $.accumulus.usageBalances, {
        _fillViewForm: function () {
            var widget = this;
            var usageBalances = widget._usageBalances;
            var $viewForm = widget._$viewForm;
            var list = $viewForm.find('.acc-usage-balances-list');
            list.empty();

            if (usageBalances && usageBalances.length > 0) {
                for (var i in usageBalances) {
                    var b = usageBalances[i];

                    //Labels
                    var usageTypeLabel = "Type:";
                    try {
                        usageTypeLabel = Accumulus.labels.usageBalances['type:'];
                    } catch (e) {
                        Accumulus.info(e.msg);
                    };

                    var paidLabel = "Paid balance:";
                    try {
                        paidLabel = Accumulus.labels.usageBalances['paidBalance:'];
                    } catch (e) {
                        Accumulus.info(e.msg);
                    };

                    var giftLabel = "Gift balance:";
                    try {
                        giftLabel = Accumulus.labels.usageBalances['giftBalance:'];
                    } catch (e) {
                        Accumulus.info(e.msg);
                    };

                    //Values
                    var typeCode = b.UsageTypeCode;
                    var usageType = null;
                    try {
                        //TODO: might have to move all codes to a single category, are they the same category as status? Does every widget can share the same codes?
                        usageType = Accumulus.labels.usageBalances.usageTypeCodes[typeCode];
                    } catch (e) {
                        Accumulus.info(e.msg);
                    };
                    usageType = usageType || b.UsageTypeName || '';

                    var paidBalance = b.PaidBalance;
                    var giftBalance = b.GiftBalance;

                    if (typeof widget.options.formatQuantityHandler == 'function') {
                        paidBalance = widget.options.formatQuantityHandler(typeCode, paidBalance);
                        giftBalance = widget.options.formatQuantityHandler(typeCode, giftBalance);
                    }

                    var fieldsContainer = $('<div></div>').addClass('ui-grid-a')
                        .append(
                        $('<div></div>').addClass('ui-block-a')
                            .append(
                            $('<label></label>').text(usageTypeLabel))
                    ).append(
                        $('<div></div>').addClass('ui-block-b')
                            .append(
                            $('<span></span>').text(usageType))
                    ).append(
                        $('<div></div>').addClass('ui-block-a')
                            .append(
                            $('<label></label>').text(paidLabel))
                    ).append(
                        $('<div></div>').addClass('ui-block-b')
                            .append(
                            $('<span></span>').text(paidBalance))
                    ).append(
                        $('<div></div>').addClass('ui-block-a')
                            .append(
                            $('<label></label>').text(giftLabel))
                    ).append(
                        $('<div></div>').addClass('ui-block-b')
                            .append(
                            $('<span></span>').text(giftBalance))
                    );

                    $('<li></li>').append(fieldsContainer).appendTo(list);
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

            $viewForm.enhanceWithin();
        }
    });

    $.widget("accumulus.usageHistory", $.accumulus.usageHistory, {
        _fillViewForm: function () {
            this._super();
            this._$viewForm.enhanceWithin();
        },
        _initDetailsForm: function () {
            this._super();
            this._$detailsContainer.enhanceWithin();
        }
    });

    $.widget("accumulus.makePayment", $.accumulus.makePayment, {
        _enhanceView: function () {
            this.element.enhanceWithin();
        }
    });

    $.widget("accumulus.portal", $.accumulus.portal, {
        _initView: function () {
            var widget = this;
            widget._super();
            var $container = widget.element;
            if (widget.options.showHeader) {
                $('[data-role="page"]').enhanceWithin();
            } else {
                $container.find('.acc-portal-content').enhanceWithin();
            }
            var $form = $container.find('.acc-reset-password-form');
            $form.find('.acc-reset-password').closest('.ui-btn').hide();
        },

        _enhanceView: function () {
            var widget = this;
            var $container = widget.element;
            var $viewForm = $container.find('.acc-portal-content');

            //BALANCE
            if (!widget.options.showBalance) {
                $viewForm.find('.acc-balance-selection').remove();
            }
            $viewForm.find('.acc-balance-selection').bind('collapsibleexpand', function () {
                var options = widget._getWidgetOptions();
                $(this).find('.acc-plugin-container').balance(options);
            });

            //PROFILE
            if (!widget.options.showProfile) {
                $viewForm.find('.acc-profile-selection').remove();
            }
            $viewForm.find('.acc-profile-selection').bind('collapsibleexpand', function () {
                var options = widget._getWidgetOptions();
                var profileOptions = {
                    customerEdit: widget.options.profile_onCustomerEdit,
                    passwordChange: widget.options.profile_onPasswordChange,
                    showChangePassword: widget.options.profile_showChangePassword,
                    vatOnEServices: widget.options.profile_vatOnEServices,
                    taxInformationCountries: widget.options.profile_taxInformationCountries
                };
                $.extend(profileOptions, options);
                $(this).find('.acc-plugin-container').profile(profileOptions);
            });

            //SUBSCRIPTIONS LIST
            if (!widget.options.showSubscriptionList) {
                $viewForm.find('.acc-subscriptions-list-selection').remove();
            }
            $viewForm.find('.acc-subscriptions-list-selection').bind('collapsibleexpand', function () {
                var options = widget._getWidgetOptions();
                var subscriptionListOptions = {
                    itemFieldsHandler: widget.options.subscriptionList_itemFieldsHandler,
                    cancelSubscription: widget.options.subscriptionList_cancelSubscription
                };
                $.extend(subscriptionListOptions, options);
                $(this).find('.acc-plugin-container').subscriptionList(subscriptionListOptions);
            });

            //STATEMENTS HISTORY
            if (!widget.options.showStatementHistory) {
                $viewForm.find('.acc-statement-history-selection').remove();
            }
            $viewForm.find('.acc-statement-history-selection').bind('collapsibleexpand', function () {
                var options = widget._getWidgetOptions();
                $(this).find('.acc-plugin-container').statementHistory(options);
            });

            //USAGE BALANCES
            if (!widget.options.showUsageBalances) {
                $viewForm.find('.acc-usage-balances-selection').remove();
            }
            $viewForm.find('.acc-usage-balances-selection').bind('collapsibleexpand', function () {
                var options = widget._getWidgetOptions();
                var usageBalancesOptions = {
                    formatQuantityHandler: widget.options.usageBalances_formatQuantityHandler
                };
                $.extend(usageBalancesOptions, options);
                $(this).find('.acc-plugin-container').usageBalances(usageBalancesOptions);
            });

            //USAGE HISTORY
            if (!widget.options.showUsageHistory) {
                $viewForm.find('.acc-usage-history-selection').remove();
            }
            $viewForm.find('.acc-usage-history-selection').bind('collapsibleexpand', function () {
                var options = widget._getWidgetOptions();
                var usageHistoryOptions = {
                    skip: widget.options.usageHistory_skip,
                    take: widget.options.usageHistory_take,
                    fromDateTime: widget.options.usageHistory_fromDateTime
                };
                $.extend(usageHistoryOptions, options);
                $(this).find('.acc-plugin-container').usageHistory(usageHistoryOptions);
            });

            //PAYMENT METHODS
            if (!widget.options.showPaymentMethods) {
                $viewForm.find('.acc-payment-methods-selection').remove();
            }
            $viewForm.find('.acc-payment-methods-selection').bind('collapsibleexpand', function () {
                var options = widget._getWidgetOptions();
                var paymentMethodsOptions = {
                    showCreditCards: widget.options.paymentMethods_showCreditCards,
                    showBankAccounts: widget.options.paymentMethods_showBankAccounts,
                    showBillingAgreements: widget.options.paymentMethods_showBillingAgreements,
                    confirmUrl: widget.options.paymentMethods_confirmUrl,
                    cancelUrl: widget.options.paymentMethods_cancelUrl
                };
                $.extend(paymentMethodsOptions, options);
                $(this).find('.acc-plugin-container').paymentMethods(paymentMethodsOptions);
            });

            //MAKE PAYMENT
            if (!widget.options.showMakePayment) {
                $viewForm.find('.acc-make-payment-selection').remove();
            }
            $viewForm.find('.acc-make-payment-selection').bind('collapsibleexpand', function () {
                var options = widget._getWidgetOptions();
                var makePaymentOptions = {
                    paymentMade: widget.options.makePayment_onPaymentMade
                };
                $.extend(makePaymentOptions, options);
                $(this).find('.acc-plugin-container').makePayment(makePaymentOptions);
            });
        },

        _showCaptcha: function (captchaUrl) {
            var $form = this.element.find('.acc-reset-password-form');
            $form.find('.acc-captcha-field').show();
            $form.find('.acc-captcha-img').attr('src', captchaUrl);
            $form.find('.acc-get-captcha').closest('.ui-btn').hide();
            $form.find('.acc-reset-password').closest('.ui-btn').show();
        },

        _hideCaptcha: function () {
            var $form = this.element.find('.acc-reset-password-form');
            $form.find('.acc-get-captcha').closest('.ui-btn').show();
            $form.find('.acc-reset-password').closest('.ui-btn').hide();
            $form.find('[name="captcha"]').val(null);
            $form.find('.acc-captcha-field').hide();
        }
    });

    $.widget("accumulus.signup", $.accumulus.signup, {
        _subscriptionItemSectionTemplate:
            '<div class="acc-subscription-item-information">' +
                '<div class="acc-subscription-item-banner ui-bar ui-bar-b">' +
                    '<h3 class="acc-title">${productName}</h3>' +
                '</div>' +
                '<div class="acc-subscription-item-form"></div>' +
            '</div>',

        _customInputFieldTemplate:
            '<fieldset class="acc-custom-field">' +
                '<label for="acc-subscription-item-field-${code}" class="acc-description-label">${name}:</label>' +
                '<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">' +
                    '<input id="acc-subscription-item-field-${code}" name="${code}" type="text" ${required} ${pattern} />' +
                '</div>' +
            '</fieldset>',

        _customSelectFieldTemplate:
            '<fieldset class="acc-custom-field">' +
                '<label for="acc-subscription-item-field-${code}" class="acc-description-label">${name}:</label>' +
                '<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">' +
                    '<select id="acc-subscription-item-field-${code}" name="${code}" ${required}></select>' +
                '</div>' +
            '</fieldset>',

        _enhanceView: function () {
            var widget = this;
            var $container = widget.element;
            var $ccCollapsible = $container.find('.acc-credit-card-collapsible');
            var $baCollapsible = $container.find('.acc-bank-account-collapsible');
            var $ppCollapsible = $container.find('.acc-billing-agreement-collapsible');

            //Open Default payment method //TODO: Review it works on UI
            switch (widget.options.defaultPaymentMethod) {
                case Accumulus.constants.CREDIT_CARD:
                    $ccCollapsible.attr('data-collapsed', false);
                    widget._selectedPaymentMethod = Accumulus.constants.CREDIT_CARD;
                    break;
                case Accumulus.constants.BANK_ACCOUNT:
                    $baCollapsible.attr('data-collapsed', false);
                    widget._selectedPaymentMethod = Accumulus.constants.BANK_ACCOUNT;
                    break;
                case Accumulus.constants.BILLING_AGREEMENT:
                    $ppCollapsible.attr('data-collapsed', false);
                    widget._selectedPaymentMethod = Accumulus.constants.BILLING_AGREEMENT;
                    break;
            }

            if (!widget.options.showCreditCard) {
                $ccCollapsible.hide();
            }
            if (!widget.options.showBankAccount) {
                $baCollapsible.hide();
            }
            if (!widget.options.showBillingAgreement) {
                $ppCollapsible.hide();
            }

            $container.enhanceWithin();

            $ccCollapsible.on('collapsibleexpand', function (event) {
                widget._selectedPaymentMethod = Accumulus.constants.CREDIT_CARD;
            });

            $baCollapsible.on('collapsibleexpand', function (event) {
                widget._selectedPaymentMethod = Accumulus.constants.BANK_ACCOUNT;
            });

            $ppCollapsible.on('collapsibleexpand', function (event) {
                widget._selectedPaymentMethod = Accumulus.constants.BILLING_AGREEMENT;
            });

            $ccCollapsible.on('collapsiblecollapse', function (event) {
                if (widget._selectedPaymentMethod == Accumulus.constants.CREDIT_CARD) {
                    widget._selectedPaymentMethod = null;
                }
            });

            $baCollapsible.on('collapsiblecollapse', function (event) {
                if (widget._selectedPaymentMethod == Accumulus.constants.BANK_ACCOUNT) {
                    widget._selectedPaymentMethod = null;
                }
            });

            $ppCollapsible.on('collapsiblecollapse', function (event) {
                if (widget._selectedPaymentMethod == Accumulus.constants.BILLING_AGREEMENT) {
                    widget._selectedPaymentMethod = null;
                }
            });
        },
        _selectCountry: function (countrySelectInput, value, statesSelectInput, callback) {
            var widget = this;
            $(countrySelectInput).val(value);
            $(countrySelectInput).selectmenu("refresh");
            if (statesSelectInput) {
                widget._fillStates(statesSelectInput, value, callback);
            }
        },
        _selectState: function (stateSelectInput, value) {
            this._super(stateSelectInput, value);
            $(stateSelectInput).selectmenu("refresh", true);
        },
        _selectCountryAndState: function (countrySelectInput, countryCode,
                                          statesSelectInput, stateCode) {
            var widget = this;
            $(countrySelectInput).val(countryCode);
            $(countrySelectInput).selectmenu("refresh");
            if (statesSelectInput) {
                widget._fillStates(statesSelectInput, countryCode, function () {
                    widget._selectState(statesSelectInput, stateCode);
                });
            }
        },
        _fillStates: function (stateSelect, countryCode, callback) {
            this._super(stateSelect, countryCode, callback);
            $(stateSelect).selectmenu("refresh", true);
        },
        _selectCurrentYear: function () {
            this._super();
            this.element.find('[name="year"]').selectmenu('refresh', true);
        }
    });
})(jQuery);
