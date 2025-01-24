import { normalizeHrefInRuntime as normalizeHref } from '@rspress/runtime';
import { Link, Tag } from '@theme';
import { useEffect, useRef } from 'react';
import { type SidebarItemProps, highlightTitleStyle } from '.';
import { renderInlineMarkdown } from '../../logic';
import { SidebarGroup } from './SidebarGroup';
import styles from './index.module.scss';
import { preloadLink } from './utils';

export function SidebarItem(props: SidebarItemProps) {
  const { item, depth = 0, activeMatcher, id, setSidebarData } = props;
  const active = 'link' in item && item.link && activeMatcher(item.link);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (active) {
      ref.current?.scrollIntoView({
        block: 'center',
      });
    }
  }, []);

  if ('items' in item) {
    return (
      <SidebarGroup
        id={id}
        key={`${item.text}-${id}`}
        item={item}
        depth={depth}
        activeMatcher={activeMatcher}
        collapsed={item.collapsed}
        setSidebarData={setSidebarData}
      />
    );
  }

  return (
    <Link href={normalizeHref(item.link)} className={styles.menuLink}>
      <div
        ref={ref}
        onMouseEnter={() => preloadLink(item.link)}
        className={`${
          active ? styles.menuItemActive : styles.menuItem
        } mt-0.5 py-2 px-3 font-medium flex`}
        style={{
          // The first level menu item will have the same font size as the sidebar group
          fontSize: depth === 0 ? '14px' : '13px',
          marginLeft: depth === 0 ? 0 : '18px',
          borderRadius: '0 var(--rp-radius) var(--rp-radius) 0',
          ...(depth === 0 ? highlightTitleStyle : {}),
        }}
      >
        <Tag tag={item.tag} />
        <span>{renderInlineMarkdown(item.text)}</span>
      </div>
    </Link>
  );
}
