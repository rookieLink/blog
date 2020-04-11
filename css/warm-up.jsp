<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <mstatic:link rel="stylesheet" href="/css/expo/venue/www/warm-up.css"></mstatic:link>
        <%--    <mstatic:link rel="stylesheet" href="/css/expo/gray/www/2019/expo-home.css" media="all"></mstatic:link>--%>

    </head>

    <body>
        <%@include file="/WEB-INF/jsp/expo/venue/www/module/header.jsp"%>

            <div class="banner-wrap" style="background-position:center; background-image: url(${expoInfo.bodyBg})">
                <div class="content-wrap">
                    <div class="content-r">
                        <div class="form-box">
                            <div class="form-title">
                                Register for Attendance
                            </div>
                            <form class="form-cont obelisk-form J-regisForm">
                                <div class="form-item">
                                    <input type="text" name="name" placeholder="Your Name" class="input-text" maxlength="30" autocomplete="off" />
                                </div>
                                <div class="form-item">
                                    <input type="text" name="Email" placeholder="Your Email" class="input-text" autocomplete="off" />
                                </div>
                                <div class="form-item">
                                    <input type="text" name="company" placeholder="Your Company" class="input-text" maxlength="30" autocomplete="off" />
                                </div>
                                <div class="form-item">
                                    <input type="text" name="keywords" placeholder="Sourcing Product(s)" class="input-text" maxlength="30" autocomplete="off" />
                                </div>
                                <div class="form-item form-item-wrap">
                                    <div class="form-item-l">
                                        <input type="text" name="quantity" placeholder="Purchase Quantity" class="input-text input-quantity" maxlength="20" autocomplete="off" />
                                    </div>
                                    <div class="form-item-r">
                                        <select name="unit">
                                <option value="Piece(s)">Piece(s)</option>
                                <option value="222">2222</option>
                                <option value="333">3333</option>
                            </select>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-submit">Submit</button>
                            </form>
                            </divclass>
                        </div>
                    </div>
                    <input type="hidden" name="deadline" />
                </div>
            </div>
            <div class="common-centent experience-wrap">
                <div class="module-title-container">
                    <div class="module-title">
                        Experience More Than Offline Exhibition
                    </div>
                </div>

                <div class="experience-row">
                    <div class="experience-wrap-left">
                        <div class="content-img">
                            <img src="/mic_touch/img/expo/venue/experience/1.png">
                        </div>
                    </div>
                    <div class="experience-wrap-right">
                        <div class="content-message">
                            <div class="title-container">
                                <div class="experience-message-title" style="color: #F6EB4F">
                                    Audited Supplier-Get You
                                </div>
                                <div class="experience-message-title" style="color: #F6EB4F">
                                    Reliable Suppliers
                                </div>
                            </div>
                            <div class="detail-container">
                                <div class="experience-message-detail">
                                    Audited Reports Online for Free
                                </div>
                                <div class="experience-message-detail">
                                    Abundant Products from 14 Industries
                                </div>
                                <div class="experience-message-more J-play-video" style="color:#F6EB4F;">
                                    <i class="micon">&#xe03f;</i> View More
                                    <script type="text/data-video">{ "videoUrl": "http://v.youku.com/v_show/id_XMzk5NDI5MDYwMA==.html", "vid": "", "autoplay": true }
                                    </script>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="experience-row">
                    <div class="experience-wrap-left">
                        <div class="content-message">
                            <div class="title-container">
                                <div class="experience-message-title" style="color: #F6EB4F">
                                    Advanced-Technology
                                </div>
                                <div class="experience-message-title" style="color: #F6EB4F">
                                    Experience Bring You Immersive
                                </div>
                                <div class="experience-message-title" style="color: #F6EB4F">
                                    Experience
                                </div>
                            </div>
                            <div class="detail-container">
                                <div class="experience-message-detail">
                                    Live Online Meetings-Face to Face with Suppliers
                                </div>
                                <div class="experience-message-detail">
                                    Factory Verification with 360° VR
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="experience-wrap-right">
                        <div class="content-img">
                            <img src="/mic_touch/img/expo/venue/experience/2.png">
                        </div>
                    </div>
                </div>
                <div class="experience-row">
                    <div class="experience-wrap-left">
                        <div class="content-img">
                            <img src="/mic_touch/img/expo/venue/experience/3.png">
                        </div>
                    </div>
                    <div class="experience-wrap-right">
                        <div class="content-message">
                            <div class="title-container">
                                <div class="experience-message-title" style="color: #F6EB4F">
                                    Satisfied Prices
                                </div>
                            </div>
                            <div class="detail-container">
                                <div class="experience-message-detail">
                                    Coupons from Made-in-China.com
                                </div>
                                <div class="experience-message-detail">
                                    Concessional Prices from Suppliers
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="experience-row">
                    <div class="experience-wrap-left">
                        <div class="content-message">
                            <div class="title-container">
                                <div class="experience-message-title" style="color: #F6EB4F">
                                    First-Rate Services
                                </div>
                            </div>
                            <div class="detail-container">
                                <div class="experience-message-detail">
                                    Superior Services for Star Buyers
                                </div>
                                <div class="experience-message-detail">
                                    Available List of All Exhibitors
                                </div>
                                <div class="experience-message-detail">
                                    Loading & Products Inspection Service
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="experience-wrap-right">
                        <div class="content-img">
                            <img src="/mic_touch/img/expo/venue/experience/4.png">
                        </div>
                    </div>
                </div>
            </div>
            <div class="common-centent step-wrap">
                <div class="module-title-container">
                    <div class="module-title">
                        How to Participate in
                    </div>
                </div>
                <div class="step-detail-container">
                    <div class="step-detail">
                        <div class="step-icon-container">
                            <i class="micon">&#xe019;</i>
                        </div>
                        <div class="step-info">
                            <div class="step-info-top">
                                <div class="step-name">Step <span>1</span></div>
                                <div class="step-line"></div>
                            </div>
                            <div class="step-info-bottom">
                                Register and submit your sourcing request
                            </div>
                        </div>
                    </div>
                    <div class="step-detail">
                        <div class="step-icon-container">
                            <i class="micon">&#xe076;</i>
                        </div>
                        <div class="step-info">
                            <div class="step-info-top">
                                <div class="step-name">Step <span>2</span></div>
                                <div class="step-line"></div>
                            </div>
                            <div class="step-info-bottom">
                                Get the list of all exhibitors
                            </div>
                        </div>
                    </div>
                    <div class="step-detail">
                        <div class="step-icon-container">
                            <i class="micon">&#xe184;</i>
                        </div>
                        <div class="step-info">
                            <div class="step-info-top">
                                <div class="step-name">Step <span>3</span></div>
                            </div>
                            <div class="step-info-bottom">
                                Attend the expo as scheduled
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="common-centent hot-items-wrap">
                <div class="module-title-container">
                    <div class="module-title">Hot Items</div>
                </div>
                <div class="hot-items-container">
                    <div class="hot-item">
                        <div class="hot-img">
                            <img src="/mic_touch/img/expo/venue/hot_item/item.png" />
                        </div>
                        <div class="hot-item-desp">Best Commercial Motorized</div>
                        <div class="hot-item-desp"> Treadmill, Professional Treadmill Treadmill Treadmill</div>
                    </div>
                    <div class="hot-item">
                        <div class="hot-img">
                            <img src="/mic_touch/img/expo/venue/hot_item/item.png" />
                        </div>
                        <div class="hot-item-desp">Best Commercial Motorized</div>
                        <div class="hot-item-desp"> Treadmill, Professional Treadmill Treadmill Treadmill</div>
                    </div>
                    <div class="hot-item">
                        <div class="hot-img">
                            <img src="/mic_touch/img/expo/venue/hot_item/item.png" />
                        </div>
                        <div class="hot-item-desp">Best Commercial Motorized</div>
                        <div class="hot-item-desp"> Treadmill, Professional Treadmill Treadmill Treadmill</div>
                    </div>
                    <div class="hot-item">
                        <div class="hot-img">
                            <img src="/mic_touch/img/expo/venue/hot_item/item.png" />
                        </div>
                        <div class="hot-item-desp">Best Commercial Motorized</div>
                        <div class="hot-item-desp"> Treadmill, Professional Treadmill Treadmill Treadmill</div>
                    </div>
                    <div class="hot-item">
                        <div class="hot-img">
                            <img src="/mic_touch/img/expo/venue/hot_item/item.png" />
                        </div>
                        <div class="hot-item-desp">Best Commercial Motorized</div>
                        <div class="hot-item-desp"> Treadmill, Professional Treadmill Treadmill Treadmill</div>
                    </div>
                    <div class="hot-item">
                        <div class="hot-img">
                            <img src="/mic_touch/img/expo/venue/hot_item/item.png" />
                        </div>
                        <div class="hot-item-desp">Best Commercial Motorized</div>
                        <div class="hot-item-desp"> Treadmill, Professional Treadmill Treadmill Treadmill</div>
                    </div>
                </div>
            </div>
            <div class="footer-wrap">
                <div class="footer-grid">
                    <div class="footer-simple-links">
                        <div class="footer-simple-links-group">
                            <div class="footer-simple-links-row">
                                <a rel="nofollow" href="https://www.made-in-china.com/aboutus/main/" target="_blank">About Us</a>
                                <span class="gap-line"></span>
                                <a rel="nofollow" href="https://www.made-in-china.com/help/faq/" target="_blank">FAQ</a>
                                <span class="gap-line"></span>
                                <a rel="nofollow" href="https://www.made-in-china.com/help/main/" target="_blank">Help</a>
                                <span class="gap-line"></span>
                                <a rel="nofollow" href="https://www.made-in-china.com/help/sitemap/" target="_blank">Site Map</a>
                                <span class="gap-line"></span>
                                <a rel="nofollow" href="https://www.made-in-china.com/aboutus/contact/" target="_blank">Contact
                        Us</a>
                                <span class="gap-line"></span>
                                <a rel="nofollow" href="https://m.made-in-china.com/" target="_blank">Mobile Site</a>
                            </div>
                        </div>
                        <div class="footer-simple-links-group">
                            <div class="footer-simple-links-row">
                                <a rel="nofollow" href="https://www.made-in-china.com/help/terms/" target="_blank">Terms &
                        Conditions</a>
                                <span class="gap-line"></span>
                                <a rel="nofollow" href="https://www.made-in-china.com/help/declaration/" target="_blank">Declaration</a>
                                <span class="gap-line"></span>
                                <a rel="nofollow" href="https://www.made-in-china.com/help/policy/" target="_blank">Privacy
                        Policy</a>
                            </div>
                            <div class="footer-simple-links-row">
                                Copyright © 1998-2020
                                <a rel="nofollow" href="https://www.focuschina.com/html_en/" target="_blank">Focus Technology Co.,
                        Ltd. </a> All Rights Reserved.
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div id="J-video-container" class="pop360" style="display: none">
                <div class="p-cover J-cover"></div>
                <div class="p-view p-video-view J-view">
                    <div id="J-video-show" class="p-view"></div>
                </div>
                <div class="p-close J-close"><i class="ob-icon icon-delete"></i></div>
            </div>
            <script>
                if (window.innerWidth > 1440) {

                } else if (window.innerWidth >= 1024) {

                }
            </script>
            <mstatic:script type="text/javascript" charset="utf-8" src="/common/js/libs/jquery.js"></mstatic:script>
            <mstatic:script type="text/javascript" src="/common/js/assets/template/template.js" charset="utf-8"></mstatic:script>
            <mstatic:script type="text/javascript" src="/common/js/business/global/util.js" charset="utf-8"></mstatic:script>
            <mstatic:script type="text/javascript" src="/common/js/assets/select2/select.js" charset="utf-8"></mstatic:script>
            <mstatic:script type="text/javascript" charset="utf-8" src="/common/js/assets/validation/validator.plus.js"></mstatic:script>
            <mstatic:script type="text/javascript" charset="utf-8" src="/common/js/assets/observe/observe.js"></mstatic:script>
            <mstatic:script type="text/javascript" charset="utf-8" src="/common/js/assets/player/player.js"></mstatic:script>
            <!-- 搜索功能引入-->
            <mstatic:script type="text/javascript" charset="utf-8" src="/common/js/assets/artDialog/2.0.0/artDialog.js"></mstatic:script>
            <mstatic:script type="text/javascript" charset="utf-8" src="/common/js/libs/class.0.3.2.js"></mstatic:script>
            <mstatic:script type="text/javascript" charset="utf-8" src="/common/js/assets/observe/observe.js"></mstatic:script>
            <mstatic:script type="text/javascript" charset="utf-8" src="/common/js/assets/JFixed/JFixed.2.1.js"></mstatic:script>
            <mstatic:script type="text/javascript" charset="utf-8" src="/common/js/assets/placeholder/placeholder.1.3.js"></mstatic:script>
            <mstatic:script type="text/javascript" charset="utf-8" src="/common/js/assets/maskSelect/maskSelect.1.0.min.js"></mstatic:script>
            <mstatic:script type="text/javascript" charset="utf-8" src="/common/js/assets/suggest/inputSuggest.1.1.0.js"></mstatic:script>
            <mstatic:script type="text/javascript" charset="utf-8" src="/common/js/assets/picRound/picRound.js"></mstatic:script>
            <mstatic:script type="text/javascript" charset="utf-8" src="/common/js/business/searchBar/search.js"></mstatic:script>
            <mstatic:script type="text/javascript" charset="utf-8" src="/common/js/business/plugs/slideNav/slideNav.js"></mstatic:script>
            <!--引入结束-->
            <mstatic:script type="text/javascript" charset="utf-8" src="/mic_touch/js/expo/module/playVideo.js"></mstatic:script>
            <mstatic:script type="text/javascript" charset="utf-8" src="/mic_touch/js/expo/venue/www/module/video.js"></mstatic:script>
            <mstatic:script type="text/javascript" src="/mic_touch/js/expo/venue/www/module/video.js" charset="utf-8"></mstatic:script>
            <mstatic:script type="text/javascript" src="/mic_touch/js/expo/venue/www/warm-up.js" charset="utf-8"></mstatic:script>
    </body>

    </html>