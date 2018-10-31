const title = 'TicketWatch';
const iconPath = 'icons/mojogear96.png';
const panel = 'http://example.com';

browser.menus.create({
  id: 'open-link-in-sidebar',
  title: 'Open Link in Sidebar',
  contexts: ['link'],
});

browser.menus.create({
  id: 'open-page-in-sidebar',
  title: 'Open Page in Sidebar',
  contexts: ['page', 'tab'],
});

browser.menus.create({
  id: 'open-bookmark-in-sidebar',
  title: 'Open Bookmark in Sidebar',
  contexts: ['bookmark'],
});

browser.menus.onClicked.addListener((info) => {
  browser.sidebarAction.open();
  if ('linkUrl' in info) {
    browser.sidebarAction.setPanel({ panel: info.linkUrl });
  } else if ('pageUrl' in info) {
    browser.sidebarAction.setPanel({ panel: info.pageUrl });
  } else if ('bookmarkId' in info) {
    browser.bookmarks.get(info.bookmarkId)
      .then(([bookmark]) => browser.sidebarAction.setPanel({ panel: bookmark.url }));
  }
});

const loadTicketWatch = (tab) => {
  browser.sidebarAction.setPanel({ panel });
}

const setTitle = (title) => {
  browser.sidebarAction.setTitle({ title });
}

const setIcon = (path) => {
  browser.sidebarAction.setIcon({ path });
}

const openSidebar = (tab) => {
  browser.sidebarAction.open()
  .then( loadTicketWatch(tab) )
  .then( setTitle(title) )
  .then( setIcon(iconPath) )
}

browser.browserAction.onClicked.addListener(openSidebar);
