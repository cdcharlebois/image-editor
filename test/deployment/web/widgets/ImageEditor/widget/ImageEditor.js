define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "ImageEditor/lib/fabric",

    "dojo/text!ImageEditor/widget/template/ImageEditor.html"
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, fabric, widgetTemplate) {
    "use strict";

    return declare("ImageEditor.widget.ImageEditor", [_WidgetBase, _TemplatedMixin], {

        templateString: widgetTemplate,

        // nodes
        canvasNode: null,
        widgetBase: null,
        addTextButtonNode: null,
        addArrowButtonNode: null,
        saveButtonNode: null,

        //modeler variables
        canvasHeight: 500,
        canvasWidth: 900,
        imAttribute: null,
        imageMapping: null, // {imKey: string, imImage: image}

        // Internal variables.
        _handles: null,
        _contextObj: null,

        constructor: function () {
            this._handles = [];
        },

        postCreate: function () {
            logger.debug(this.id + ".postCreate");

            this.canvas = new fabric.Canvas(this.canvasNode);

            // fabric.Image.fromURL('/img/MyFirstModule$_16_base_back.png', function (oImg) {
            //     this.canvas.add(oImg);
            // }.bind(this));
            this._setupEvents();
        },

        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;
            if (this._contextObj) {
                this._drawDefaultCMB();
            }
            this._updateRendering(callback);
        },

        resize: function (box) {
            logger.debug(this.id + ".resize");
            // this._resizeCanvas(); // could resize to window?
            this._updateRendering();
        },

        uninitialize: function () {
            logger.debug(this.id + ".uninitialize");
        },

        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");
            this._resizeCanvas();
            this._drawCanvasBackground();
            this._executeCallback(callback, "_updateRendering");
        },

        // Shorthand for running a microflow
        _execMf: function (mf, guid, cb) {
            logger.debug(this.id + "._execMf");
            if (mf && guid) {
                mx.ui.action(mf, {
                    params: {
                        applyto: "selection",
                        guids: [guid]
                    },
                    callback: lang.hitch(this, function (objs) {
                        if (cb && typeof cb === "function") {
                            cb(objs);
                        }
                    }),
                    error: function (error) {
                        console.debug(error.description);
                    }
                }, this);
            }
        },

        // Shorthand for executing a callback, adds logging to your inspector
        _executeCallback: function (cb, from) {
            logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        },

        /**
         * resize the canvas when the window changes size
        //  */
        _resizeCanvas: function () {
            this.canvasNode.width = this.canvasWidth;
            this.canvasNode.height = this.canvasHeight;
            this.canvas.setWidth(this.canvasWidth);
            this.canvas.setHeight(this.canvasHeight);
            this.canvas.calcOffset();
        },

        _plotImageFromContext: function () {

        },

        /**
         * REQUIRES CONTEXT
         * - resizes the canvas
         */
        _drawCanvasBackground: function () {
            var imgUrl = mx.data.getDocumentUrl(this._contextObj.getGuid(), this._contextObj.get("changedDate"), false);
            fabric.Image.fromURL(imgUrl, function (img) {
                var imgWidth = img.width
                    , imgHeight = img.height
                    , aspectRatio = imgHeight / imgWidth
                    , canvasWidth = this.canvas.width
                    , canvasHeight = this.canvas.width * aspectRatio
                    , scaleFactor = canvasWidth / imgWidth;
                img.set({
                    width: imgWidth,
                    height: imgHeight,
                    originX: 'left',
                    originY: 'top',
                    scaleX: scaleFactor,
                    scaleY: scaleFactor
                });
                this.canvas.setWidth(canvasWidth);
                this.canvas.setHeight(canvasHeight);
                this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas));
            }.bind(this));
        },

        _setupEvents: function () {
            this.connect(this.addTextButtonNode, "click", this._drawInteractiveText);
            this.connect(this.addArrowButtonNode, "click", this._drawArrow);
            this.connect(this.saveButtonNode, "click", this._saveToNewImage);
        },

        _drawInteractiveText: function () {
            var itext = new fabric.IText('Enter your Text', {
                left: this.canvas.getWidth() / 2,
                top: this.canvas.getHeight() / 2,
                fill: '#D81B60',
                strokeWidth: 2,
                stroke: "#880E4F",
                originX: 'center',
                originY: 'center'
            });
            this.canvas.add(itext);
        },

        _drawArrow: function () {
            var triangle = new fabric.Triangle({
                width: 10,
                height: 15,
                fill: 'red',
                left: 235,
                top: 65,
                angle: 90
            });

            var line = new fabric.Line([50, 100, 200, 100], {
                left: 75,
                top: 70,
                stroke: 'red'
            });

            var objs = [line, triangle];

            var alltogetherObj = new fabric.Group(objs, {
                left: this.canvas.getWidth() / 2,
                top: this.canvas.getHeight() / 2,
                originX: 'center',
                originY: 'center',
                // lockScalingX: true,
                // lockScalingY: true
            });
            this.canvas.add(alltogetherObj);
        },

        /**
         * SAVE TO NEW IMAGE
         *  - save the canvas contents to a new image object
         *  - copy the association from the source image->parent to this new object
         */
        _saveToNewImage: function () {
            this.saveButtonNode.setAttribute("disabled", null);
            this.saveButtonNode.innerText = "Saving..."
            this._getNewImageObject()
                .then(this._copyParentAssociationToNewObject.bind(this))
                .then(this._saveCanvasContentsToImage.bind(this))
                .then(function () {
                    this.saveButtonNode.removeAttribute("disabled");
                    this.saveButtonNode.innerText = "Save";
                }.bind(this));
        },

        /**
        * GetImageObejctGuid
        * ---
        * Returns the image object (either from context or creates one)
        *  
        * @author Conner Charlebois
        * @since Jul 30, 2018
        * @returns newly created MyImage object
        */
        _getNewImageObject: function () {
            return new Promise(lang.hitch(this, function (resolve, reject) {
                // create a new object of this entity
                mx.data.create({
                    entity: "MyFirstModule.MyImage",
                    callback: lang.hitch(this, function (obj) {
                        console.log("The object has been created");
                        resolve(obj);
                    }),
                    error: function (e) {
                        reject("there was an error creating this object");
                    },
                });
            }));
        },

        /**
         * @returns MyImage Object with parent association set and the IsAnnotated flag set
         */
        _copyParentAssociationToNewObject: function (object) {
            return new Promise(lang.hitch(this, function (resolve, reject) {
                // context object exists and is tied to a parent entity
                if (this._contextObj && this._contextObj.get("MyFirstModule.MyImage_ParentEntity")) {
                    object.set("MyFirstModule.MyImage_ParentEntity", this._contextObj.get("MyFirstModule.MyImage_ParentEntity"));
                    object.set("IsAnnotated", true);
                    resolve(object);
                }
                reject("Context object is empty or there is no parent association set");
            }));
        },

        _saveCanvasContentsToImage: function (object) {
            return new Promise(lang.hitch(this, function (resolve, reject) {
                this.canvas.deactivateAll().renderAll();
                this.canvasNode.toBlob(lang.hitch(this, function (blob) {
                    var fname = "img_" + new Date().toISOString().replace(/\W/g, "") + ".jpg";
                    window.mx.data.saveDocument(
                        object.getGuid(), fname, {
                            width: 640,
                            height: 480
                        },
                        blob,
                        lang.hitch(this, function () {
                            console.log("ok");
                            resolve();
                        }),
                        function (err) {
                            reject("error");
                        });
                }));
            }));

        },

        /**
         * Look at the context object, and draw the right image (based on the mapping in this.imageMapping)
         */
        _drawDefaultCMB: function () {
            var key = this._contextObj.get(this.imAttribute); // "_16Back"
            var image = this.imageMapping.find(function (pair) { return pair.imKey === key }); // {imKey: "_16Back", imImage: "...?"}
            fabric.Image.fromURL(image.imImage, function (oImg) {
                this.canvas.add(oImg);
            }.bind(this));
        },



    });
});

require(["ImageEditor/widget/ImageEditor"]);
