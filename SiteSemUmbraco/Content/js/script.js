(function($)
{

    "use strict";
    /*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/
    // Check ie and version
    function isIE()
    {
        var myNav=navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie')!=-1)?parseInt(myNav.split('msie')[1],10):false;
    }

    // Toggle mobile navigation
    function toggleMobileNavigation()
    {
        var navbar=$("#navbar");
        var navLinks=$("#navbar > ul > li > a:not(.dropdown-toggle)");
        var openBtn=$(".navbar-header .open-btn");
        var closeBtn=$("#navbar .close-navbar");

        openBtn.on("click",function()
        {
            if(!navbar.hasClass("slideInn"))
            {
                navbar.addClass("slideInn");
            }
            return false;
        })

        closeBtn.on("click",function()
        {
            if(navbar.hasClass("slideInn"))
            {
                navbar.removeClass("slideInn");
            }
            return false;
        })

        navLinks.on("click",function()
        {
            if(navbar.hasClass("slideInn"))
            {
                navbar.removeClass("slideInn");
            }
            return false;
        })
    }

    toggleMobileNavigation();


    // Parallax background
    function bgParallax()
    {
        if($(".parallax").length)
        {
            $(".parallax").each(function()
            {
                var height=$(this).position().top;
                var resize=height-$(window).scrollTop();
                var doParallax=-(resize/5);
                var positionValue=doParallax+"px";
                var img=$(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url("+img+")",
                    backgroundSize: "cover",
                    backgroundPosition: "50%"+positionValue
                });
            });
        }
    }


    // Hero slider background setting
    function sliderBgSetting()
    {
        if($(".hero-slider .slide").length)
        {
            $(".hero-slider .slide").each(function()
            {
                var $this=$(this);
                var img=$this.children(img);
                var imgSrc=img.attr("src");

                $this.css({
                    backgroundImage: "url("+imgSrc+")",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                })

            });
        }
    }


    // Flower pattern parallax setting
    function parallaxFlower()
    {
        if($(".parallax-flower").length)
        {
            $(".parallax-flower").each(function()
            {
                var height=$(this).position().top;
                var resize=height-$(window).scrollTop();
                var doParallax=-(resize/3);
                var pValueTopImg=doParallax+"px";
                var pvalueBtmImg=doParallax+"px";
                var img1=$(this).data("bg-image-top");
                var img2=$(this).data("bg-image-bottom");

                $(this).css({
                    backgroundImage: "url("+img1+")"+", "+"url("+img2+")",
                    backgroundPosition: "0%"+pValueTopImg+", "+"100%"+pvalueBtmImg
                });

            });
        }
    }


    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader()
    {
        if($('.preloader').length)
        {
            $('.preloader').delay(100).fadeOut(500,function()
            {

                //active wow
                wow.init();

                // Call slider parallax function
                sliderBgSetting();

                //Active heor slider
                if($(".hero-slider").length)
                {
                    $(".hero-slider").owlCarousel({
                        items: 1,
                        autoplay: true,
                        loop: true,
                        animateOut: 'fadeOut',
                        navText: ''
                    });
                }

            });
        }
    }



    /*------------------------------------------
        = ACTIVE CURRENT MENU WHILE SCROLLING
    -------------------------------------------*/
    // function for active menuitem
    var sections=$("section"),
        nav=$("#navbar"),
        nav_height=nav.outerHeight();

    function activeMenuItem()
    {
        var cur_pos=$(window).scrollTop()+2;
        sections.each(function()
        {
            var top=$(this).offset().top-nav_height,
                bottom=top+$(this).outerHeight();

            if(cur_pos>=top&&cur_pos<=bottom)
            {
                nav.find("ul > li > a").parent().removeClass("active");
                nav.find("a[href='#"+$(this).attr('id')+"']").parent().addClass("active");
            } else if(cur_pos===2)
            {
                nav.find("ul > li > a").parent().removeClass("active");
            }
        });
    }

    // smooth-scrolling
    $(function()
    {
        $("#navbar > ul > li > a:not(.dropdown-toggle)").on("click",function()
        {
            if(location.pathname.replace(/^\//,'')===this.pathname.replace(/^\//,'')&&location.hostname===this.hostname)
            {
                var target=$(this.hash);
                target=target.length?target:$("[name="+this.hash.slice(1)+"]");
                if(target.length)
                {
                    $("html, body").animate({
                        scrollTop: target.offset().top-60
                    },1000,"easeInOutExpo");
                    return false;
                }
            }

            return false;
        });
    });


    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/
    $(window).on("scroll",function()
    {
        var header=$("#header");
        var scroll=$(window).scrollTop();
        var top=$(".hero").height();

        if(scroll>top)
        {
            header.addClass("sticky");
        } else
        {
            header.removeClass("sticky");
        }
    });


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow=new WOW({
        boxClass: 'wow',      // default
        animateClass: 'animated', // default
        offset: 0,          // default
        mobile: true,       // default
        live: true        // default
    });


    /*------------------------------------------
        = BIGDAY COUNTDOWN
    -------------------------------------------*/
    if($("#clock").length)
    {
        var marrigeDate=new Date(2017,10,14,17,0,0,0)

        $("#clock").countdown({
            until: marrigeDate
        }).on('update.countdown',function(event)
        {
            $(this).addClass("asdf");
        }).on('finish.countdown',function(event)
        {
            console.log("111111111");
        });

    }

    /*------------------------------------------
        = THE WEDDING
    -------------------------------------------*/
    function eventClothFadeOut()
    {
        if($(".events .event-boxes").length)
        {
            var eventBoxes=$('.event-boxes');
            var leftHalf=eventBoxes.find(".left-half");
            var rightHalf=eventBoxes.find(".right-half");
            var clip=eventBoxes.find(".clip");

            // If not ie and ie < 10 then do
            if(isIE()&&!isIE()<10)
            {
                leftHalf.css({
                    left: "-100%"
                });
                rightHalf.css({
                    right: "-100%"
                });

                clip.css({
                    opacity: 0
                })
            } else
            { // Not ie or geter than ie 10
                leftHalf.css({
                    left: 0
                });
                rightHalf.css({
                    right: 0
                });
            }

            eventBoxes.appear();

            $(document.body).on('appear','.event-boxes',function()
            {
                if(!leftHalf.hasClass('appeared')||rightHalf.hasClass("appeared"))
                {
                    leftHalf.addClass('appeared slideOutLeft');
                    rightHalf.addClass('appeared slideOutRight');
                    clip.addClass('appeared clip-fade-out');
                }
            });

            $(document.body).on('disappear','.event-boxes',function()
            {
                if(rightHalf.hasClass('appeared')||leftHalf.hasClass('appeared'))
                {
                    rightHalf.removeClass('appeared slideOutRight');
                    leftHalf.removeClass('appeared slideOutLeft');
                    clip.removeClass('appeared clip-fade-out');
                }
            });
        };
    }

    eventClothFadeOut();


    /*------------------------------------------
        = ACTIVE BQUOTE SLIDER
    -------------------------------------------*/
    if($(".bquotes-slider").length)
    {
        $(".bquotes-slider").owlCarousel({
            items: 1,
            loop: true,
            navText: "",
        });
    }


    /*------------------------------------------
        = ACTIVE GROOMSMEN SLIDER
    -------------------------------------------*/
    if($("#groomsmen-slider").length)
    {
        $("#groomsmen-slider").owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-long-arrow-left"></i>','<i class="fa fa-long-arrow-right"></i>'],
            dots: false,
            mouseDrag: false
        });
    }


    /*------------------------------------------
        = ACTIVE GROOMSMEN SLIDER
    -------------------------------------------*/
    if($("#bridesmaids-slider").length)
    {
        $("#bridesmaids-slider").owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-long-arrow-left"></i>','<i class="fa fa-long-arrow-right"></i>'],
            dots: false,
            mouseDrag: false
        });
    }



    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
    $(".fancybox").fancybox({
        image: {
            protect: true
        },
        touch: true,
        keyboard: true,
        focus: true,
        closeClickOutside: true,
        fullScreen: {
            requestOnStart: false
        },


    });


    /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
    function masonryGridSetting()
    {
        if($('.masonry-gallery').length)
        {
            var $grid=$('.masonry-gallery').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress(function()
            {
                $grid.masonry('layout');
            });
        }
    }

    masonryGridSetting();


    /*------------------------------------------
        = sfalcin galery Event
    -------------------------------------------*/
    $('.sfalcin-grid').masonry({
        itemSelector: '.sfalcin-grid',
        columnWidth: '.sfalcin-grid'
    });

    /*------------------------------------------
        = GOOGLE MAP
    -------------------------------------------*/
    function map()
    {

        var locations=[
            ['Sitio Sfalcin - TO-020 KM 16 NA ESTRADA PARA APARECIDA DO RIO NEGRO',-10.230111,-48.180111]
        ];

        var map=new google.maps.Map(document.getElementById('map'),{
            center: new google.maps.LatLng(-10.230111,-48.180111),
            zoom: 10,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        });

        var infowindow=new google.maps.InfoWindow();

        var marker,i;

        for(i=0;i<locations.length;i++)
        {
            marker=new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1],locations[i][2]),
                map: map,
                icon: '/Content/images/map-marker.png'
            });

            google.maps.event.addListener(marker,'click',(function(marker,i)
            {
                return function()
                {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map,marker);
                }
            })(marker,i));
        }
    };


    /*------------------------------------------
        = RSVP FORM SUBMISSION
    -------------------------------------------*/
    if($("#rsvp-form").length)
    {
        $("#rsvp-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: "required",

                text: {
                    required: true
                },
            },

            messages: {
                name: "Digite seu nome",
                email: "Digite seu e-mail",
                text: "Digite sua mensagem"
            },

            submitHandler: function(form)
            {
                var data=$(form).serialize();
                PNotify.removeAll();
                $("#loader").show();
                $("#btnEnviar").hide();
                data.subject='entrou em contato';
                $.ajax({
                    type: "POST",
                    url: "/home/contact",
                    data: data,
                    success: function()
                    {
                        $("#loader").hide();
                        $("#btnEnviar").show();
                        $('#myModal').modal('toggle');
                        form.reset();
                        new PNotify({
                            title: 'Sucesso!',
                            text: 'Sua mensagem foi enviada! Logo logo vamos responder!',
                            type: 'success',
                            icon: 'glyphicon glyphicon-envelope'
                        });
                    },
                    error: function()
                    {
                        $("#btnEnviar").show();
                        $("#loader").hide();
                        new PNotify({
                            title: 'Ops!',
                            text: 'Ocorreu um erro ao enviar a mensagem.! Tente novamente em alguns instantes.',
                            type: 'error',
                            icon: 'glyphicon glyphicon-warning-sign'
                        });
                    }
                });
                return false;
            }

        });
    }


    /*==========================================================================
        WHEN DOCUMENT LOADING 
    ==========================================================================*/
    $(window).on('load',function()
    {
        preloader();

        bgParallax();

        sliderBgSetting();

        parallaxFlower();

        masonryGridSetting();

        if($(".map").length)
        {
            map();
        }
    });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll",function()
    {
        activeMenuItem();

        bgParallax();

        parallaxFlower();
    });


    /*==========================================================================
    Gifts and Firebase - Home
    ==========================================================================*/
    var initApp=function()
    {
        var initTranslate=function()
        {
            setTimeout(function()
            {
                let dl='pt-BR';
                let bl=navigator.language;
                let google='Google';
                let facebook='Facebook';
                let email='password';

                bl==='en-US'||bl==='en-us'?runlang(bl):runlang(dl);

                function translate(text,provider)
                {
                    var container=$('.firebaseui-idp-'+provider.toLowerCase()+' .firebaseui-idp-text-long');
                    if(provider==='password')
                    {
                        provider='email';
                        container.text(text+' '+provider);
                    } else
                    {
                        container.text(text+' '+provider);
                    }
                }

                function runlang(lang)
                {
                    if(lang==='en-US'||lang==='en-us')
                    {
                        let sign_in='Sign in with';
                        translate(sign_in,google);
                        translate(sign_in,facebook);
                        translate(sign_in,email);
                    } else
                    {
                        let sign_in='Usar o';
                        translate(sign_in,google);
                        translate(sign_in,facebook);
                        translate(sign_in,email);
                    }
                }
            },1000);
        }; window.addEventListener('load',initTranslate);

        new firebaseui.auth.AuthUI(firebase.auth()).start('#firebaseui-auth-container',{
            callbacks: { signInSuccess: function(currentUser,credential,redirectUrl) { return false; },uiShown: function() { initTranslate(); } },
            credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
            queryParameterForWidgetMode: 'mode',
            queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
            signInFlow: 'popup',
            signInSuccessUrl: false,
            signInOptions: [
              firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            tosUrl: false
        });

        firebase.auth().onAuthStateChanged(function(user)
        {
            if(user)
            {
                user.getIdToken().then(function(accessToken)
                {
                    $('#myLoginModal').modal('hide');
                });
            }
        },function(error)
        {
            console.log(error);
        });

        var database=firebase.database();
        var giftRef=firebase.database().ref('gift/');
        giftRef.on('value',function(snapshot)
        {
            let list=_.sortBy(snapshot.val(),'name');
            $.each(list,function(key,value)
            {
                toggleLine(value);
                if(key>=list.length-1)
                {
                    $('.gift').unbind("click");
                    $('.gift').click(function()
                    {
                        var gift=$(this).data('gift');
                        var currentUser=firebase.auth().currentUser;
                        if(currentUser)
                        {
                            donateGiftAndThanks(gift);
                        }
                        else
                        {
                            $('#myLoginModal').data("gift",$(this).data('gift'));
                            $('#myLoginModal').data("reason","donateGift");
                            $('#myLoginModal').modal('show');
                        }
                    });
                }
            });
        });

        function toggleLine(gift)
        {
            var element=$("#"+gift.key).prop('id');
            if(!element)
            {
                $('#giftlist').append('<a id="'+gift.key+'" class="gift" href="javascript:;">'+gift.name+'</a>')
                var a=$("#"+gift.key);
                $(a).data('gift',gift);
                if(gift.godfatherName&&gift.godfatherName.length>3)
                {
                    $(a).addClass('giftwithgodfather');
                }
                else
                {
                    $(a).removeClass('giftwithgodfather');
                }
            }
        }

        $('.btnSair').unbind("click");
        $('.btnSair').click(function()
        {
            var currentUser=firebase.auth().currentUser;
            if(currentUser)
            {
                var provider=firebase.auth().signOut().then(function(user)
                {
                    location.reload();
                });
            }
        });

        $('#myLoginModal').unbind("hidden.bs.modal");
        $('#myLoginModal').on('hidden.bs.modal',function(event)
        {
            switch($(this).data('reason'))
            {
                case 'donateGift':
                    donateGiftAndThanks($(this).data('gift'))
                    break;
                case 'confirmPresence':
                    break;
                default:
            }
        })

        function donateGiftAndThanks(gift)
        {
            PNotify.removeAll();
            var currentUser=firebase.auth().currentUser;
            if(gift&&currentUser&&currentUser.displayName)
            {
                if(gift.godfatherName==currentUser.displayName)
                {
                    $('#'+gift.key).removeClass('giftwithgodfather');
                    writeGiftData({ displayName: '',email: '' },gift);
                    new PNotify({
                        title: 'Tudo bem!',
                        type: 'info',
                        text: 'Você pode escolher um outro presente se quiser...',
                        icon: 'glyphicon glyphicon-gift'
                    });
                }
                else
                {
                    console.log(gift);
                    if(gift.godfatherName&&gift.godfatherName!=currentUser.displayName)
                    {
                        new PNotify({
                            title: 'Que pena '+currentUser.displayName+'!',
                            type: 'error',
                            text: 'Nós já ganhamos este presente de um outro amigo. Mas você pode escolher outro pra nos dar!',
                            icon: 'glyphicon glyphicon-gift'
                        });
                    }
                    else
                    {
                        new PNotify({
                            title: 'Sério mesmo?',
                            text: 'Você quer nos dar o presente <b>'+gift.name+'</b>?',
                            icon: 'glyphicon glyphicon-question-sign',
                            confirm: {
                                confirm: true,
                                buttons: [{
                                    text: 'Sim',
                                    click: function(notice)
                                    {
                                        console.log(currentUser);
                                        if(writeGiftData(currentUser,gift))
                                        {
                                            notice.remove();
                                            $('#'+gift.key).addClass('giftwithgodfather');
                                            new PNotify({
                                                title: 'Que legal!',
                                                text: 'Acabamos de anotar que vamos ganhar o presente <b>'+gift.name+'</b> de você '+currentUser.displayName+'. Muito obrigado por nos presentear!',
                                                type: 'success',
                                                icon: 'glyphicon glyphicon-gift'
                                            });
                                            $.ajax({
                                                type: "POST",
                                                url: "/home/contact",
                                                data: {
                                                    name: currentUser.displayName,
                                                    email: currentUser.email,
                                                    text: currentUser.displayName + " acabou de dizer que vai nos dar: "+gift.name,
                                                    subject: "acabou de nos dar um presente"
                                                },
                                            });
                                        }
                                    }
                                },{
                                    text: 'Não',
                                    click: function(notice)
                                    {
                                        notice.remove();
                                        new PNotify({
                                            title: 'Tudo bem!',
                                            type: 'info',
                                            text: 'Você pode escolher um outro presente se quiser...',
                                            icon: 'glyphicon glyphicon-gift'
                                        });
                                    }
                                }]
                            },
                            buttons: {
                                closer: false,
                                sticker: false
                            },
                            history: {
                                history: false
                            }
                        });
                    }
                }
            }
        }

        function writeGiftData(godfather,gift)
        {
            if(gift&&godfather)
            {
                gift.godfatherName=godfather.displayName;
                gift.godfatherMail=godfather.email;
                var updates={};
                updates['gift/'+gift.key]=gift;
                firebase.database().ref().update(updates);
                $('#'+gift.key).data('gift',gift);
                return true;
            }
        }
    };

    window.addEventListener('load',function()
    {
        initApp();
    });
})(window.jQuery);
