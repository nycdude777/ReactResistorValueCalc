
import React from 'react';

function $split(props, arrayOfKeysToExtract) {
    let original = props;
    let result = {
        reduction: {},
        extraction: {}
    };
    Object.keys(original).forEach(key => {
        if (arrayOfKeysToExtract.some(x => key === x)) {
            result.extraction[key] = original[key];
        }
        else {
            result.reduction[key] = original[key];
        }
    });
    return result;
}
function $augment(props, additionalProperties) {
    let extendedObject = {};
    Object.assign(extendedObject, props);
    //as per write-clean-code specifications, we won't use a switch/if statement for logic flow
    let extender = {
        className: (targetObject, value) => {
            let existingClasses = [];
            if (targetObject.className) {
                existingClasses = existingClasses.concat(targetObject.className.split(' '));
            }
            existingClasses = existingClasses.concat([value]);
            targetObject.className = existingClasses.join(' ');
        }
    };
    Object.keys(additionalProperties).forEach(propertyName => {
        if (extender.hasOwnProperty(propertyName)) {
            extender[propertyName](extendedObject, additionalProperties[propertyName]);
        }
        else {
            extendedObject[propertyName] = additionalProperties[propertyName];
        }
    });
    return extendedObject;
}

function $e(/*tag, props, content*/) {
    let reParse = (re, str) => { let m = re.exec(str); return m && m.length > 0 ? m[1] : undefined; };
    let parseName = (input) => { return reParse(/^([a-zA-Z0-9]+?)($|\#|\s|\n|\.)/, input); };
    let parseId = (input) => { return reParse(/^\S+?\#(\S+?)[\.\s$]/, input); };
    let parseClass = (input) => { return reParse(/[\S\s\-]+?\.([\S\-]+?)(\s|\#|$)/, input); };
    let parseAttributes = (input) => {
        var attrre = /\s(\S+=".*?")/g;
        var attrm = attrre.exec(input);
        var keyValuePairs = [];
        while (attrm != null) {
            var tokens = attrm[1].split('=');
            if ((tokens[1][0] === '\'' && tokens[1][tokens[1].length - 1] === '\'') ||
                (tokens[1][0] === '"' && tokens[1][tokens[1].length - 1] === '"')) {
                tokens[1] = tokens[1].substring(1, tokens[1].length - 1);
            }
            keyValuePairs.push({ key: tokens[0], value: tokens[1] });
            attrm = attrre.exec(input);
            if (attrre.lastIndex < 0) {
                break;
            }
        }
        return keyValuePairs;
    };
    let parseTag = (input) => { return { name: parseName(input), id: parseId(input), className: parseClass(input), attributes: parseAttributes(input) }; };
    let parseStack = (input) => {
        if (typeof input !== 'string') {
            //probably React component constructor function or Class
            let type, name;
            if (input.prototype.constructor) {
                type = 'class';
                name = input.prototype.constructor.name;
            }
            else {
                type = 'function';
                name = input.prototype.name;
            }
            return [{ reference: input , type: type, name: name, id: null, className: null, attributes: [] }];
        }

        let stackedm = (/^(\S+(\s*\>\s*\S+)+)/).exec(input);
        let stack = [];
        if (stackedm != null) {
            var tokens = stackedm[1].split('>');
            tokens.forEach(x => { stack.push(parseTag(x.trim())); });
        } else {
            stack.push(parseTag(input));
        }
        return stack;
    };
    let parseContent_OLD = (content) => {
        let _asNode = (_target, _content) => {
            if (typeof _content === 'object' && _content.nodeName) {
                return _content;
            }
            else {
                if (_target.tagName === 'UL' || _target.tagName === 'OL') {
                    return $e('li', _content);
                }
                else if (_target.tagName === 'select') {
                    return $e('option', _content);
                }
                return document.createTextNode(_content);
            }
        }

        if (typeof content === 'undefined') return;
        if (content === null) return null;

        if (Array.isArray(content)) {
            let items = [];
            content.forEach(item => {
                items = items.concat([parseContent(item)])
            });
            return items;
        }

        if (content.hasOwnProperty('value')) {
            return content.value;
        }
        else {
            return content;
        }
        
    };

    let parseContent = (content) => {
        
        if (typeof content === 'undefined') return;
        if (content === null) return null;

        if (Array.isArray(content)) {
            let items = [];
            if (content.length > 1) {
                content.forEach(item => { items.push(parseContent(item)); });
            }
            else if (content.length === 1) {
                items = parseContent(content[0]);
            }
            else {
                items = null;
            }
            return items;
        }
        else {
            if (content.hasOwnProperty('value')) {
                return content.value;
            }
            else {
                return content;
            }
        }
    };


    //need to parse the arguments
    let element, props, content;

    if (arguments.length === 0) {
        return
    } else {
        let args = Array.from(arguments);
        //tag is always first
        element = args[0];
        if (args.length > 1) {
            //if the second argument has keys, it is props object, rest is content
            let isArray = Array.isArray(args[1]);
            let isString = typeof args[1] === 'string';
            let hasNoKeys = Object.keys(args[1]).length === 0;
            let isReactElement = args[1] && args[1].hasOwnProperty('$$typeof');
            if (isArray || isString || hasNoKeys || isReactElement) {
                //no props, its all content
                content = args.slice(1);
            }
            else {
                props = args[1];
                content = args.slice(2);                
            }
        }
    }

    var stack = parseStack(element);

    let attr = {};
    Object.assign(attr, props);

    let _endElement;
    while (stack.length) {
        let tag = stack.pop();
        if (tag.id) { attr.id = tag.id; }
        if (tag.className) { attr.className = tag.className.split('.').join(' '); }

        for (let i = 0; i < tag.attributes.length; i++) {
            attr[tag.attributes[i].key] = tag.attributes[i].value;
        }
                
        let payload; //this will be the third argument (the value) we pass to React.createElement()

        if (_endElement) { //this would happen if the tag was nested like so div > ul > li
            //the tag is parsed into a stack and processed from the end (because we do stack.pop())
            //so on each consecutive iteration, we need to take the output from last iteration, and pass it as content
            //to createElement() of the current iteration.  
            payload = _endElement;
        }
        else {
            payload = parseContent(content);
        }

        if (Array.isArray(payload) && (tag.name === 'li' || tag.name === 'option')) {
            let items = [];
            for (let i = 0; i < payload.length; i++) {
                attr.key = i;
                let ractElement = React.createElement(tag.reference ? tag.reference : tag.name, attr, payload[i]);
                items.push(ractElement);
            }

            _endElement = items;
        }
        else {
            _endElement = React.createElement(tag.reference ? tag.reference : tag.name, attr, payload);
        }        
        
        //when the tag is stacked, the props only apply to the last element
        //so after the top-of-the-stack element is processed empty the attr object containing props 
        attr = {};
    }
    return _endElement;
}

export { $e, $split, $augment }; 