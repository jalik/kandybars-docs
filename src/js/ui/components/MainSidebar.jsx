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

import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, NavLink } from 'react-router-dom';

const Package = require('../../../../package.json');

function MenuItem(props) {
  const { url, icon, name } = props;
  return (
    <NavLink
      to={url}
      className="sidebar-menu-link"
      activeClassName="active"
    >
      <span className={icon} />
      <span>{name}</span>
    </NavLink>
  );
}

MenuItem.defaultProps = {
  icon: '',
};

MenuItem.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  url: PropTypes.string.isRequired,
};

function MainSidebar() {
  return (
    <aside
      id="sidebar"
      className="sidebar"
    >
      <div className="sidebar-header">
        <Link
          to="/"
          href="/"
          className="sidebar-brand"
        >
          <span className="sidebar-logo">{Package.name}</span>
          <sup className="sidebar-version">{Package.version}</sup>
        </Link>
      </div>
      <nav className="sidebar-nav">
        <div
          className="sidebar-menu"
          id="components-menu"
        >
          <h3>
            <FormattedMessage
              id="syntax"
              defaultMessage="Syntax"
            />
          </h3>
          <MenuItem
            name={(
              <FormattedMessage
                id="variable"
                defaultMessage="Variable"
              />
            )}
            url="/syntax/variable"
          />
          <MenuItem
            name={(
              <FormattedMessage
                id="eval"
                defaultMessage="Eval"
              />
            )}
            url="/syntax/eval"
          />
          <MenuItem
            name={(
              <FormattedMessage
                id="condition"
                defaultMessage="Condition"
              />
            )}
            url="/syntax/condition"
          />
          <MenuItem
            name={(
              <FormattedMessage
                id="loop"
                defaultMessage="Loop"
              />
            )}
            url="/syntax/loop"
          />
          <MenuItem
            name={(
              <FormattedMessage
                id="helper"
                defaultMessage="Helper"
              />
            )}
            url="/syntax/helper"
          />
          <MenuItem
            name={(
              <FormattedMessage
                id="partial"
                defaultMessage="Partial"
              />
            )}
            url="/syntax/partial"
          />
        </div>
      </nav>
    </aside>
  );
}

export default MainSidebar;
