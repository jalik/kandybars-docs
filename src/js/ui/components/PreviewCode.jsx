/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 Karl STEIN
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import Prism from 'prismjs';
import 'prismjs/components/prism-handlebars';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/themes/prism.css';
import PropTypes from 'prop-types';
import React from 'react';

class PreviewCode extends React.Component {
  constructor(props) {
    super(props);
    this.codeRef = null;
    this.handleContentChanged = this.handleContentChanged.bind(this);
  }

  handleContentChanged() {
    const { onContentChanged } = this.props;
    if (typeof onContentChanged === 'function') {
      onContentChanged(this.codeRef.innerText);
    }
  }

  render() {
    let { content } = this.props;
    const { contentEditable, language } = this.props;

    try {
      content = Prism.highlight(content, Prism.languages[language]);
    } catch (err) {
      console.error(err);
    }
    return (
      <code
        className={`code line-numbers language-${language}`}
        contentEditable={contentEditable}
        tabIndex={0}
        onKeyDown={this.handleContentChanged}
        onKeyUp={this.handleContentChanged}
        ref={(code) => { this.codeRef = code; }}
        role="textbox"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
}

PreviewCode.defaultProps = {
  content: '',
  contentEditable: false,
  onContentChanged: null,
};

PreviewCode.propTypes = {
  content: PropTypes.string,
  contentEditable: PropTypes.bool,
  language: PropTypes.string.isRequired,
  onContentChanged: PropTypes.func,
};

export default PreviewCode;
